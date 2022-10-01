import React, { useEffect, useState } from "react";
import yoga from "../fakeData/yoga.json";
import user from "../assets/user.jpg";
import { toast } from "react-toastify";
const Main = () => {
  const [activitys, setActivitys] = useState(yoga);

  const [totalTime, settotalTime] = useState(0);

  const [active, setActive] = useState(
    localStorage.getItem("addBreak")
      ? JSON.parse(localStorage.getItem("addBreak"))
      : { id: 1, time: 10 }
  );
  const [objects, setObjects] = useState([
    { id: 1, time: 10 },
    { id: 2, time: 20 },
    { id: 3, time: 30 },
    { id: 4, time: 40 },
    { id: 5, time: 50 },
  ]);
  const selectItem = (id, item) => {
    localStorage.removeItem("addBreak");
    setActive(item);
    localStorage.setItem("addBreak", JSON.stringify(item));
  };

  const handleAddList = (id, time, activity) => {
    settotalTime((prev) => prev + Number(time));

    const restActivitys = activitys.filter((act) => act.id !== activity.id);

    const totalActivitys = [
      ...restActivitys,
      { ...activity, click: activity.click + 1 },
    ];
    totalActivitys.sort(function (a, b) {
      return a.id - b.id;
    });
    setActivitys(totalActivitys);
    toast.success(
      `Successfully added ${activity.english_name} ${activity.click + 1} times`
    );
  };

  // console.log(active);
  const handleClickComplete = () => {
    if (totalTime == 0) {
      toast.error("Please add at least one of  your  Exercise time");
    } else {
      const selectItems = activitys.filter((nam) => nam.click >= 1);
      console.log(selectItems);
      toast.success(
        `You have selected : ${selectItems
          .map((nam) => nam.english_name)
          .toString()} with breaktimes ${active.time} seceonds`
      );
    }
  };

  return (
    <section className="container mx-auto ">
      <div className="flex md:flex-row flex-col justify-between">
        <div className="basis-3/4	 ">
          <h2 className="py-3 pl-5 text-3xl">Select today’s exercise:</h2>
          <div className="flex md:flex-row flex-col flex-wrap ">
            {activitys.map((activity, i) => {
              return (
                <div className="md:basis-1/2 lg:basis-1/3 px-4  mb-8">
                  <div className="card overflow-hidden  rounded-2xl  bg-gradient-to-r from-indigo-500">
                    <img
                      src={activity.img_url}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body py-6 px-3">
                      <h5 className="card-title">{activity.sanskrit_name}</h5>
                      <p className="card-text">
                        {" "}
                        <strong>Time Required</strong> :{activity.time}Min
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          handleAddList(activity.id, activity.time, activity)
                        }
                        class="mt-4 py-3 text-yellow-50 rounded-2xl px-8 bg-gradient-to-r from-violet-900 to-blue-500 hover:from-blue-500 hover:to-violet-900  ..."
                      >
                        {activity.click > 0 ? "Added" : "Add to list"}{" "}
                        {activity.click > 0 && activity.click}
                      </button>
                      {/* <button
                        className={
                          activity.click > 0
                            ? "btn btn-success"
                            : "btn btn-primary"
                        }
                        onClick={() =>
                          handleAddList(activity.id, activity.time, activity)
                        }
                      >
                        {activity.click > 0 ? "Added" : "Add to list"}{" "}
                        {activity.click > 0 && activity.click}
                      </button> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="basis-1/4  mt-8 md:px-0 px-4">
          <div className="userDetails flex items-center mt-2 mb-5">
            <img src={user} className="w-[80px] rounded-full" alt="" />
            <div className="px-4 d-flex align-items-start flex-column justify-content-center">
              <h4 className="text-2xl">Demo user</h4>
              <p className="text-sm">India, West Bengol Kolkata</p>
            </div>
          </div>

          {/* userInfo */}
          <div className="bg-zinc-200 my-4 flex justify-around py-3 rounded-md">
            <div className="">
              <h4>75kgs</h4>
              <p>weight</p>
            </div>
            <div className="">
              <h4>75kgs</h4>
              <p>weight</p>
            </div>
            <div className="">
              <h4>75kgs</h4>
              <p>weight</p>
            </div>
          </div>
          <h3>Add a break:</h3>
          <div className="flex bg-zinc-200 py-3 rounded-md items-center justify-around my-3">
            {objects.map((item, index) => (
              <>
                <div
                  // style={{
                  //   borderRadius: "50%",
                  //   display: "flex",
                  //   alignItems: "center",
                  //   justifyContent: "center",
                  //   marginTop: "5px",
                  //   paddingTop: "12px",
                  // }}
                  className={`bg-violet-900 p-2 text-yellow-200   rounded-full flex flex-col items-center justify-center  ${
                    active.id == item.id && "inactive"
                  }`}
                  onClick={() => selectItem(index, item)}
                >
                  <p> {item.time}s</p>
                </div>
              </>
            ))}
          </div>

          <h3>Exercise Details:</h3>
          <p>
            <strong>Exercise time:</strong> {totalTime} seconds
          </p>
          <p>
            <strong>Break time:</strong> {active.time} seconds
          </p>

          <button
            type="button"
            class="bg-gradient-to-r w-full py-4 rounded-2xl mt-8 text-white from-violet-900 to-blue-500 hover:from-blue-500 hover:to-violet-900  ..."
            onClick={handleClickComplete}
          >
            Activity Complete
          </button>
        </div>
      </div>
    </section>
  );
};

export default Main;
