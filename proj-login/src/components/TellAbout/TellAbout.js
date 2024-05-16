import React, { useState } from 'react';
import styles from '../static/tell_about.css'; // Import the CSS module

import { initializeApp} from "firebase/app"
import { getFirestore} from "firebase/firestore"

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function TellAbout() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [isFemale, setIsFemale] = useState(false);
  const [isMale, setIsMale] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [hobbies, setHobbies] = useState([]);
  const [lookingForFemale, setLookingForFemale] = useState(false);
  const [lookingForMale, setLookingForMale] = useState(false);
  const [lookingForFriend, setLookingForFriend] = useState(false);
  const [lookingForLover, setLookingForLover] = useState(false);
  const [lookingForChat, setLookingForChat] = useState(false);
  const [expectation, setExpectation] = useState('');
  const [agreeToShare, setAgreeToShare] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleGenderChange = (e) => {
    if (e.target.id === 'sex_female') {
      setIsFemale(e.target.checked);
      setIsMale(false);
    } else if (e.target.id === 'sex_male') {
      setIsMale(e.target.checked);
      setIsFemale(false);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setUploadedPhoto(URL.createObjectURL(file));
  };

  const handleHobbyChange = (e) => {
    const hobby = e.target.id;
    if (e.target.checked) {
      setHobbies([...hobbies, hobby]);
    } else {
      setHobbies(hobbies.filter((item) => item !== hobby));
    }
  };

  const handleLookingForChange = (e) => {
    if (e.target.id === 'search_female') {
      setLookingForFemale(e.target.checked);
    } else if (e.target.id === 'search_male') {
      setLookingForMale(e.target.checked);
    }
  };

  const handleRelationshipChange = (e) => {
    const relationship = e.target.id;
    if (e.target.checked) {
      switch (relationship) {
        case 'search_friend':
          setLookingForFriend(true);
          break;
        case 'search_lover':
          setLookingForLover(true);
          break;
        case 'search_chat':
          setLookingForChat(true);
          break;
        default:
          break;
      }
    } else {
      switch (relationship) {
        case 'search_friend':
          setLookingForFriend(false);
          break;
        case 'search_lover':
          setLookingForLover(false);
          break;
        case 'search_chat':
          setLookingForChat(false);
          break;
        default:
          break;
      }
    }
  };

  const handleExpectationChange = (e) => {
    setExpectation(e.target.value);
  };

  const handleAgreeToShareChange = (e) => {
    setAgreeToShare(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <Navbar isAuthenticated={false}/> {/* Pass isAuthenticated as false for login page */}
      <div id="content_tell_about">
        <p id="tell_about_title"> Tell about yourself! </p>

        <form onSubmit={handleSubmit} id="form_tell_about">

          {/* User */}
          <section className="user_info">
            {/* Left section */}
            <div className="left-section">
              <div id="name_contact">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="What is your name?"
                />
                <input
                  type="text"
                  id="contact"
                  value={contact}
                  onChange={handleContactChange}
                  placeholder="Your contact (Telegram):"
                />
              </div>

              <div id="sex">
                <div id="sex_f">
                  <input
                    type="checkbox"
                    id="sex_female"
                    checked={isFemale}
                    onChange={handleGenderChange}
                  />
                  <label htmlFor="sex_female"> I am a lady </label>
                  <i className="fa-solid fa-venus"></i>
                </div>

                <div id="sex_m">
                  <input
                    type="checkbox"
                    id="sex_male"
                    checked={isMale}
                    onChange={handleGenderChange}
                  />
                  <label htmlFor="sex_male"> I am a gentleman </label>
                  <i className="fa-solid fa-mars"></i>
                </div>
              </div>
            </div>

            {/* Right section */}
            <div className="right-section">
              <div id="photo">
                <input
                  type="file"
                  id="imageUpload"
                  name="imageUpload"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
                <label htmlFor="imageUpload">You can upload photo here</label>
              </div>

              <div id="uploadedPhoto">
                {uploadedPhoto && <img src={uploadedPhoto} alt="Uploaded" />}
              </div>
            </div>
          </section>

          {/* Hobbies */}
          <div id="hobbies">
            <div className="hobbie" id="hobbie1">
              <input
                type="checkbox"
                id="hobbies_film"
                checked={hobbies.includes('hobbies_film')}
                onChange={handleHobbyChange}
              />
              <label htmlFor="hobbies_film"> I am cinemaddict </label>
              <i className="fa-solid fa-film"></i>
            </div>
            <div class="hobbie" id="hobbie2">
                <input type="checkbox" 
                id="hobbies_music"
                checked={hobbies.includes('hobbies_music')}
                onChange={handleHobbyChange}
            />
              <label htmlFor="hobbies_music"> I am music lover </label>
              <i className="fa-solid fa-music"></i>
            </div>
            <div class="hobbie" id="hobbie3">
                <input type="checkbox" 
                id="hobbies_read"
                checked={hobbies.includes('hobbies_read')}
                onChange={handleHobbyChange}
            />
              <label htmlFor="hobbies_read"> I am bookworm </label>
              <i className="fa-solid fa-book"></i>
            </div>
            <div class="hobbie" id="hobbie4">
                <input type="checkbox" 
                id="hobbies_sport"
                checked={hobbies.includes('hobbies_sport')}
                onChange={handleHobbyChange}
            />
              <label htmlFor="hobbies_sport"> I am a sportsman/woman </label>
              <i className="fa-solid fa-dumbbell"></i>
            </div>
            <div class="hobbie" id="hobbie5">
                <input type="checkbox" 
                id="hobbies_procrastinate"
                checked={hobbies.includes('hobbies_procrastinate')}
                onChange={handleHobbyChange}
            />
              <label htmlFor="hobbies_procrastinate">  I like to procrastinate </label>
              <i className="fa-solid fa-bed"></i>
            </div>
            <div class="hobbie" id="hobbie6">
                <input type="checkbox" 
                id="hobbies_walk"
                checked={hobbies.includes('hobbies_walk')}
                onChange={handleHobbyChange}
            />
              <label htmlFor="hobbies_walk"> I am keen of promenade </label>
              <i className="fa-solid fa-walking"></i>
            </div>
            </div>
          {/* User interest */}
            <section className="user_interest_info">
            <p id="text_header">Who are you looking for?</p>

            {/* Search field */}
            <div className="user_interest">
                <div className="search">
                <div id="search_f">
                    <input
                    type="checkbox"
                    id="search_female"
                    checked={lookingForFemale}
                    onChange={handleLookingForChange}
                    />
                    <label htmlFor="search_female"> I am looking for a beautiful lady </label>
                    <i className="fa-solid fa-venus"></i>
                </div>

                <div id="search_m">
                    <input
                    type="checkbox"
                    id="search_male"
                    checked={lookingForMale}
                    onChange={handleLookingForChange}
                    />
                    <label htmlFor="search_male"> I am looking for a handsome gentleman </label>
                    <i className="fa-solid fa-mars"></i>
                </div>
                </div>

                {/* Range field */}
                <div className="range_field">
                <div id="range_1">
                    <input
                    type="checkbox"
                    id="range_first"
                    value="Range1"
                    />
                    <label htmlFor="range1"> 17-20 y.o. </label>
                </div>

                <div id="range_2">
                    <input
                    type="checkbox"
                    id="range_second"
                    value="Range2"
                    />
                    <label htmlFor="range2"> 20-23 y.o.</label>
                </div>

                <div id="range_3">
                    <input
                    type="checkbox"
                    id="range_third"
                    value="Range3"
                    />
                    <label htmlFor="range3"> 23-25 y.o.</label>
                </div>

                <div id="range_4">
                    <input
                    type="checkbox"
                    id="range_fourth"
                    value="Range4"
                    />
                    <label htmlFor="range4"> 25-27+ y.o.</label>
                </div>
                </div>

                {/* Looking for field */}
                <div className="looking_for">
                <div id="looking_f">
                    <input
                    type="checkbox"
                    id="search_friend"
                    checked={lookingForFriend}
                    onChange={handleRelationshipChange}
                    />
                    <label htmlFor="search_friend"> I need a good friend </label>
                    <i className="fa-regular fa-handshake"></i>
                </div>

                <div id="looking_l">
                    <input
                    type="checkbox"
                    id="search_lover"
                    checked={lookingForLover}
                    onChange={handleRelationshipChange}
                    />
                    <label htmlFor="search_lover"> I need a passionate lover </label>
                    <i className="fa-solid fa-hand-holding-heart"></i>
                </div>

                <div id="looking_c">
                    <input
                    type="checkbox"
                    id="search_chat"
                    checked={lookingForChat}
                    onChange={handleRelationshipChange}
                    />
                    <label htmlFor="search_chat"> I just want to chat with someone </label>
                    <i className="fa-solid fa-hand-peace"></i>
                </div>
                </div>
            </div>
            </section>
          {/* Expectation */}
          <textarea
            id="expectation"
            rows="2"
            cols="10"
            value={expectation}
            onChange={handleExpectationChange}
            placeholder="What do you expect from communication?"
          ></textarea>

          {/* Agree to share */}
          <div className="agree_field">
            <div id="agree_share">
              <input
                type="checkbox"
                id="agree"
                checked={agreeToShare}
                onChange={handleAgreeToShareChange}
              />
              <label htmlFor="agree"> I agree to share my info </label>
            </div>
            <button id="button_save" type="submit">Save</button>
          </div>

        </form>
      </div>
    </main>
  );
}

const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

export const db = getFirestore(app);
export default TellAbout;