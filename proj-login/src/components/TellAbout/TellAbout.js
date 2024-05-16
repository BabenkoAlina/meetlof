import React, { useState } from 'react';
import styles from '../TellAbout/TellAbout.module.css';
import { initializeApp} from "firebase/app"
import { getFirestore} from "firebase/firestore"
import {auth} from "../../firebaseConfig";


import { db } from "../../firebaseConfig";

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function TellAbout() {
  // current userid 
  const [userId, setUserId] = useState('');

  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');
  
  const [isFemale, setIsFemale] = useState(true);
  const [isMale, setIsMale] = useState(false);

  /////
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

  const [cinemaddict, setCinemaddict] = useState(false);
  const [music, setMusic] = useState(false);
  const [bookworm, setBookworm] = useState(false);
  const [politics, setPolitics] = useState(false);
  const [sportsman, setSportsman] = useState(false);
  const [procrastinate, setProcrastinate] = useState(false);
  const [promenade, setPromenade] = useState(false);

  const [lookingForFemale, setLookingForFemale] = useState(false);
  const [lookingForMale, setLookingForMale] = useState(false);

  const [lookingForFriend, setLookingForFriend] = useState(false);
  const [lookingForLover, setLookingForLover] = useState(false);
  const [lookingForChat, setLookingForChat] = useState(false);

  const [years17, setYears17] = useState(true);
  const [years20, setYears20] = useState(false);
  const [years23, setYears23] = useState(true);
  const [years25, setYears25] = useState(false);

  const [expectation, setExpectation] = useState('');

  const [agreeToShare, setAgreeToShare] = useState(false);


  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setUploadedPhoto(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name,
      telegram,
      isFemale,
      isMale,
      uploadedPhoto,
      cinemaddict,
      music,
      bookworm,
      politics,
      sportsman,
      procrastinate,
      promenade,
      lookingForFemale,
      lookingForMale,
      lookingForFriend,
      lookingForLover,
      lookingForChat,
      years17,
      years20,
      years23,
      years25,
      expectation,
      agreeToShare,
    };
  };




  return (
    <main>
      <Navbar isAuthenticated={false}/> {/* Pass isAuthenticated as false for login page */}
      <div id="content_tell_about">
        <p id="tell_about_title"> Tell about yourself! </p>
        <div className="nav_profile">
          <select id="profile_dropdown" onChange={handleSelectChange} value={selectedOption}>
            <option value="" disabled selected>Profile</option>
            <option value="/view_profile">View your profile</option>
            <option value="/logout">Log out</option>
          </select>
          <button onClick={navigateProfile}>Go</button>
        </div>
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
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What is your name?"
                />
                <input
                  type="text"
                  id="contact"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="Your contact (Telegram):"
                />
              </div>

              <div id="sex">
                <div id="sex_f">
                  <input
                    type="checkbox"
                    id="sex_female"
                    checked={isFemale}
                    onChange={(e) => setIsFemale(e.target.checked) && setIsMale(!e.target.checked)}
                  />
                  <label htmlFor="sex_female"> I am a lady </label>
                  <i className="fa-solid fa-venus"></i>
                </div>

                <div id="sex_m">
                  <input
                    type="checkbox"
                    id="sex_male"
                    checked={isMale}
                    onChange={(e) => setIsMale(e.target.checked) && setIsFemale(!e.target.checked)}
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
                      checked={cinemaddict}
                      onChange={(e) => setCinemaddict(e.target.checked)}
                  />
                  <label htmlFor="hobbies_film"> I am cinemaddict </label>
                  <i className="fa-solid fa-film"></i>
              </div>
              <div class="hobbie" id="hobbie2">
                  <input
                      type="checkbox"
                      id="hobbies_music"
                      checked={music}
                      onChange={(e) => setMusic(e.target.checked)}
                  />
                  <label htmlFor="hobbies_music"> I am music lover </label>
                  <i className="fa-solid fa-music"></i>
              </div>
              <div class="hobbie" id="hobbie3">
                  <input
                      type="checkbox"
                      id="hobbies_read"
                      checked={bookworm}
                      onChange={(e) => setBookworm(e.target.checked)}
                  />
                  <label htmlFor="hobbies_read"> I am bookworm </label>
                  <i className="fa-solid fa-book"></i>
              </div>
              <div class="hobbie" id="hobbie7">
                  <input
                      type="checkbox"
                      id="hobbies_politics"
                      checked={politics}
                      onChange={(e) => setPolitics(e.target.checked)}
                  />
                  <label htmlFor="hobbies_politics"> I am interested in politics </label>
                  <i className="fa-solid fa-globe"></i>
              </div>
              <div class="hobbie" id="hobbie4">
                  <input
                      type="checkbox"
                      id="hobbies_sport"
                      checked={sportsman}
                      onChange={(e) => setSportsman(e.target.checked)}
                  />
                  <label htmlFor="hobbies_sport"> I am a sportsman/woman </label>
                  <i className="fa-solid fa-dumbbell"></i>
              </div>
              <div class="hobbie" id="hobbie5">
                  <input
                      type="checkbox"
                      id="hobbies_procrastinate"
                      checked={procrastinate}
                      onChange={(e) => setProcrastinate(e.target.checked)}
                  />
                  <label htmlFor="hobbies_procrastinate"> I like to procrastinate </label>
                  <i className="fa-solid fa-bed"></i>
              </div>
              <div class="hobbie" id="hobbie6">
                  <input
                      type="checkbox"
                      id="hobbies_walk"
                      checked={promenade}
                      onChange={(e) => setPromenade(e.target.checked)}
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
                    onChange={(e) => setLookingForFemale(e.target.checked)}
                    />
                    <label htmlFor="search_female"> I am looking for a beautiful lady </label>
                    <i className="fa-solid fa-venus"></i>
                </div>

                <div id="search_m">
                    <input
                    type="checkbox"
                    id="search_male"
                    checked={lookingForMale}
                    onChange={(e) => setLookingForMale(e.target.checked)}
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
                    // value="Range1"
                    checked={years17}
                    onChange={(e) => setYears17(e.target.checked)}
                    />
                    <label htmlFor="range1"> 17-20 y.o. </label>
                </div>

                <div id="range_2">
                    <input
                    type="checkbox"
                    id="range_second"
                    // value="Range2"
                    checked={years20}
                    onChange={(e) => setYears20(e.target.checked)}
                    />
                    <label htmlFor="range2"> 20-23 y.o.</label>
                </div>

                <div id="range_3">
                    <input
                    type="checkbox"
                    id="range_third"
                    value="Range3"
                    checked={years23}
                    onChange={(e) => setYears23(e.target.checked)}
                    />
                    <label htmlFor="range3"> 23-25 y.o.</label>
                </div>

                <div id="range_4">
                    <input
                    type="checkbox"
                    id="range_fourth"
                    value="Range4"
                    checked={years25}
                    onChange={(e) => setYears25(e.target.checked)}
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
                    onChange={(e) => setLookingForFriend(e.target.checked)}
                    />
                    <label htmlFor="search_friend"> I need a good friend </label>
                    <i className="fa-regular fa-handshake"></i>
                </div>

                <div id="looking_l">
                    <input
                    type="checkbox"
                    id="search_lover"
                    checked={lookingForLover}
                    onChange={(e) => setLookingForLover(e.target.checked)}
                    />
                    <label htmlFor="search_lover"> I need a passionate lover </label>
                    <i className="fa-solid fa-hand-holding-heart"></i>
                </div>

                <div id="looking_c">
                    <input
                    type="checkbox"
                    id="search_chat"
                    checked={lookingForChat}
                    onChange={(e) => setLookingForChat(e.target.checked)}
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
            onChange={(e) => setExpectation(e.target.value)}
            placeholder="What do you expect from communication?"
          ></textarea>

          {/* Agree to share */}
          <div className="agree_field">
            <div id="agree_share">
              <input
                type="checkbox"
                id="agree"
                checked={agreeToShare}
                onChange={(e) => setAgreeToShare(e.target.checked)}
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

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// export const db = getFirestore(app);

export default TellAbout;