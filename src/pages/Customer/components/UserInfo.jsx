import React, { useCallback, useEffect, useState } from "react";
import Modal from "../../../components/UI/modal/Modal";
import Button from "../../../components/UI/button/Button";
import ReactStars from "react-stars";
import "./style.css";
import { instance } from "../../../config/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import "./userInfostyle.css";
import { gymManageAll } from "../../../config/axios";
const dayMappings = {
    SUNDAY: "воскресенье", // Sunday in Russian is воскресенье
    MONDAY: "понедельник", // Monday in Russian is понедельник
    TUESDAY: "вторник", // Tuesday in Russian is вторник
    WEDNESDAY: "среда", // Wednesday in Russian is среда
    THURSDAY: "четверг", // Thursday in Russian is четверг
    FRIDAY: "пятница", // Friday in Russian is пятница
    SATURDAY: "суббота", // Saturday in Russian is суббота
};

function UserInfo({ data, onClose }) {
    const token = useSelector((state) => state?.auth?.token);
    const userInfo = data?.trainerDetails;
    const [userDeitail, setUserDeitails] = useState({
        id: userInfo.id || "",
        firstName: userInfo?.firstName || "",
        lastName: userInfo.lastName || "",
        description: userInfo.description || "",
        education: userInfo.education || "",
        ranks: userInfo.ranks || "",
        ranks: userInfo.ranks || "",
        rating: userInfo.rating || "",
        sportsAchievements: userInfo?.sportsAchievements || "",
        workTimeFrom: userInfo?.workTimeFrom || "",
        workTimeTo: userInfo?.workTimeTo || "",
        avatarBase64: userInfo?.avatarBase64 || "",
        gymId: "",
    });
    const [editImage, setEditImage] = useState(false);
    const [base64Image, setBase64Image] = useState("");
    const [gyms, setGyms] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [editUserDeitails, setEditUserDeitails] = useState(false)



    function getDayText(day) {
        return dayMappings[day] || day; // If the day is not found in the mapping, return the original day
    }
    const daysOfWeek = userInfo?.daysOfWeek;
    function getDaysOfWeekText(daysOfWeek) {
        return daysOfWeek?.map((day) => " " + getDayText(day));
    }
    const daysOfWeekText = getDaysOfWeekText(daysOfWeek);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setBase64Image(reader.result);
        };

        if (file) {
            if (file.type === "image/svg+xml") {
                reader.readAsText(file);
            } else {
                reader.readAsDataURL(file);
            }
        }
    };

    const getGyms = useCallback(async () => {
        try {
            const response = await gymManageAll();
            const gyms = response.data;
          
            setGyms(gyms);
        } catch (error) {}
    }, []);
    useEffect(() => {
        getGyms();
    }, []);
    const optionsGyms = gyms.map((item) => {
        return item?.gyms;
    });
    const handleSelectChange = (event) => {
        setUserDeitails({ ...userDeitail, gymId: event.target.value });
        setSelectedOption(event.target.value);
    };
    const onSave=useCallback(async()=>{
        try {
            const response=await instance.post(`/gym/trainer/avatar/${userDeitail?.id}`,{
                photoBase64:base64Image
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
           if(response.status=='200'){
            toast.success(response.data?.message)
            console.log(response)
            setEditImage(false)
           }else{
            alert('Please,choose png and jpg format!')
           }
        } catch (error) {
            alert('Please,choose png and jpg format!')
        }
    },[token])
    const onChangeImage=useCallback(()=>{
        setEditImage(true);
    },[token])
    const onChangeUserDeitail=useCallback(()=>{
        setEditUserDeitails(true)
    },[token])
    const onSaveUserDeitails=useCallback(()=>{
        console.log('sad')
        setEditUserDeitails(false)
        try {
            
        } catch (error) {
            
        }
    },[])
    return (
        <>
         <Modal
            title={userInfo?.firstName + " " + userInfo?.lastName}
            onClose={onClose}
        >
            <div className='header'>
                {editImage ? (
                    <>
                       
                        {base64Image && (
                            <div>
                                {base64Image.startsWith("<svg") ? (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: base64Image,
                                        }}
                                    />
                                ) : (
                                    <img
                                        src={base64Image}
                                        alt='Uploaded'
                                        className='avatar'
                                    />
                                )}
                            </div>
                        )}
                         <input type='file' onChange={handleImageUpload} />
                    </>
                ) : (
                    <img
                        src={`data:image/png;base64,${userDeitail?.avatarBase64}`}
                        className='avatar'
                    />
                )}
                <button
                    className='userDeitailButton'
                    onClick={() => !editImage?onChangeImage():onSave()}
                >
                    {!editImage ? "Изменить фото" : "Сохранить"}
                </button>
            </div>
            <div>
                <h5>О тренере</h5>
                <div
                    style={{
                        backgroundColor: "rgba(33, 33, 34, 1)",
                        padding: 10,
                        borderRadius: 10,
                        marginBottom: 20,
                    }}
                >
                    <textarea
                        style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                            height: 50,
                            color: "#FFF",
                        }}
                        value={`${userDeitail.description}`}
                        onChange={(e) =>
                            setUserDeitails({
                                ...userDeitail,
                                description: e.target.value,
                            })
                        }
                        disabled={!editUserDeitails ? true : false}
                    />
                    <textarea
                        style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                            height: 50,
                            color: "#FFF",
                        }}
                        value={`${userDeitail.education}`}
                        onChange={(e) =>
                            setUserDeitails({
                                ...userDeitail,
                                education: e.target.value,
                            })
                        }
                        disabled={!editUserDeitails ? true : false}
                    />
                    <textarea
                        style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                            height: 50,
                            color: "#FFF",
                        }}
                        value={`${userDeitail.ranks}`}
                        onChange={(e) =>
                            setUserDeitails({
                                ...userDeitail,
                                ranks: e.target.value,
                            })
                        }
                        disabled={!editUserDeitails ? true : false}
                    />
                    <textarea
                        style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                            height: 50,
                            color: "#FFF",
                        }}
                        
                        value={`${userDeitail.sportsAchievements}`}
                        onChange={(e) =>
                            setUserDeitails({
                                ...userDeitail,
                                sportsAchievements: e.target.value,
                            })
                        }
                        disabled={!editUserDeitails ? true : false}
                    />
                </div>
                <h5>О тренере</h5>
                <div
                    style={{
                        backgroundColor: "rgba(33, 33, 34, 1)",
                        padding: 10,
                        borderRadius: 10,
                        marginBottom: 10,
                    }}
                >
                    <h4 style={{ color: "#fff" }}>{daysOfWeekText}</h4>
                </div>
                <div
                    style={{
                        backgroundColor: "rgba(33, 33, 34, 1)",
                        padding: 10,
                        borderRadius: 10,
                        marginBottom: 10,
                    }}
                >
                    <h4 style={{ color: "#fff" }}>
                        {userDeitail?.workTimeFrom}-{userDeitail?.workTimeTo}
                    </h4>
                </div>
                <select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#212122",
                        padding: "10px",
                        borderRadius: "10px",
                        color: "white",
                        marginBottom: "4%",
                    }}
                >
                    <option value=''>Select an option</option>
                    {optionsGyms[0]?.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <div style={{ marginBottom: 100 }}>
                    <button
                        className='userDeitailButton'
                        style={{ backgroundColor: "rgba(207, 84, 144, 1)" }}
                        onClick={() => !editUserDeitails?onChangeUserDeitail():onSaveUserDeitails()}
                    >
                       {!editUserDeitails? 'Изменить':'Сохранить'} 
                    </button>
                </div>
            </div>
        </Modal>
        </>
       
    );
}

export default UserInfo;
