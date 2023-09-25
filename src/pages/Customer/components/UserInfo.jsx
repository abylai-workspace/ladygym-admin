import React, { useEffect, useState } from "react";
import Modal from "../../../components/UI/modal/Modal";
import Button from "../../../components/UI/button/Button";
import ReactStars from "react-stars";
import "./style.css";
function UserInfo({ data, onClose }) {
    const [rating, setRating] = useState(0);
    const [userRating, setUserRating] = useState(0);
    const [userDesc,setUserDecs] = useState({
      description: '',
      education: '',
      ranks: '',
      sportsAchievements: '',
    });

    const userInfo = data?.trainerDetails;

    // Fetch the current user's rating for the item
    useEffect(() => {
        // Simulate an API call to fetch the user's rating for the item
        // Replace this with your actual API call
        setTimeout(() => {
            // Assume you get a user's rating from the API
            const userRatingFromAPI = userInfo?.rating; // Replace with the actual value from your API
            setUserRating(userRatingFromAPI);
            setRating(userRatingFromAPI);
        }, 1000);
    }, [data]);
    const handleRatingChange = (newRating) => {
        // Update the UI immediately
        setUserRating(newRating);

        // Simulate an API call to submit the user's rating
        // Replace this with your actual API call
        setTimeout(() => {
            // Assume you've successfully submitted the rating to the API
           
        }, 1000);
    };
  
    useEffect(()=>{
      if(userInfo){
        setUserDecs(userInfo)

      }
    },[userInfo])
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserDecs({ ...userDesc, [name]: value });
    };
    const combinedText = `${'Образование:'}${userDesc.description}\n\n${userDesc.education}\n\n${userDesc.ranks}\n\n${userDesc.sportsAchievements}`;

 
    return (
        <div>
            <Modal title={userInfo?.username} onClose={onClose}>
                <Button onClick={onClose}>Изменить фото</Button>
                <h5>О тренере</h5>
                <textarea
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#212122",
                        padding: "10px",
                        borderRadius: "10px",
                        color: "white",
                    }}
                    value={combinedText}
                    onChange={handleInputChange}
                >
                  {userInfo}
                </textarea>
                <h5>Расписание</h5>
                <input
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#212122",
                        padding: "10px",
                        borderRadius: "10px",
                        color: "white",
                        border: "none",
                    }}
                    value={data.ein}
                />
                <input
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#212122",
                        padding: "10px",
                        borderRadius: "10px",
                        color: "white",
                        border: "none",
                        marginTop: "10px",
                    }}
                    value={data.birthDate}
                />

                <section class='card'>
                    <div class='card--content'>
                        <h5>Тренер</h5>
                        <ReactStars
                            count={5}
                            value={userRating}
                            onChange={handleRatingChange}

                            size={14}
                            color2={"#CF5490"}
                        />
                        <h5>Прекрасный тренер, все понравилось!</h5>
                    </div>

                       
                    <div class='card--content'>
                        <h5>Тренер</h5>
                        <ReactStars
                            count={5}
                            value={userRating}
                            onChange={handleRatingChange}
                            size={14}
                            color2={"#CF5490"}
                        />
                        <h5>Прекрасный тренер, все понравилось!</h5>
                    </div>
                </section>

                <Button onClick={onClose}>Сохранить</Button>
            </Modal>
        </div>
    );
}

export default UserInfo;
