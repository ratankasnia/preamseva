import React, { useContext, useEffect, useState } from "react";
import questions from "./questions.json";
import useRestAPI from "../../api";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { AuthContext } from "../../context/AuthContextProvider";
import axios from "axios";
import { API_ROUTE } from "../../api/constant";
import { getToken } from "../../utility/utility";
const questionLength = questions.length;

function Questions() {
  const [State, setState] = useState(0);
  const navigate = useNavigate();
  const [careReciver, setCareReciver] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    return async () => {
      await axios
        .post(
          API_ROUTE + "/api/user/getCareReceiver",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          },
        )
        .then((res) => {
          if (res.data.status) {
            setCareReciver(res.data.data);
          } else {
            setCareReciver(null);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }, []);
  if (!currentUser) {
    return <>User not found</>;
  }
  return (
    <div>
      <div className="px-6 py-5">
        <div className=" mx-auto max-w-md rounded-md border-2 bg-white py-5  drop-shadow-xl ">
          <div>
            <span
              className={`flex cursor-pointer items-center font-bold `}
              onClick={() => navigate(-1)}
            >
              <BsArrowLeftShort size={30} /> &nbsp; Back{" "}
            </span>
          </div>
          <h3 className="text-center text-xl font-bold">
            <span>Question {State + 1}/20</span>{" "}
          </h3>
          <div className="px-5 py-5">
            <Question
              question={questions[State]}
              setState={setState}
              State={State}
              name={careReciver?.cr_nicname}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Question({ question, setState, State, name }) {
  const { carePlanQuestions, getCarePlanQuestions } = useRestAPI();

  const navigate = useNavigate();

  const [Answer, setAnswer] = useState({
    checkboxAnswer: {},
    isRadio: false,
    comment: "",
  });
  useEffect(() => {
    const getData = async () => {
      let data = await getCarePlanQuestions();

      // Find the question with the matching id
      const question = data && data.id === State + 1 ? data : null;

      if (!question) {
        setAnswer({
          checkboxAnswer: {},
          isRadio: false,
          comment: "",
        });
      } else {
        setAnswer({
          checkboxAnswer: {},
          isRadio: false, // You may need to update this based on your actual data
          comment: "", // You may need to update this based on your actual data
          // ... Extract other relevant properties from the found question
        });
      }
    };
    getData();
  }, [State]);

  const handleRadio = () => {
    console.log(Answer, "Answer");
    if (!Answer.isRadio) {
      setAnswer({
        ...Answer,
        checkboxAnswer: {},
        isRadio: true,
      });
    } else {
      setAnswer({
        ...Answer,
        checkboxAnswer: {},
        isRadio: false,
      });
    }
  };

  const isAnswerChecked = () => {
    if (!Answer.isRadio && (Answer.checkboxAnswer.length < 0 || isNullish)) {
      alert("Please select at least one  answer");
      return false;
    }
    return true;
  };
  const isNullish = Object.values(Answer.checkboxAnswer).every((value) => {
    if (value === false) {
      return true;
    }

    return false;
  });
  return (
    <>
      <div>
        <div className="pb-8">
          <h3 className="font-bold">
            {question?.question?.replace("{name}", name)}
          </h3>
          <div className="py-3">
            {question.radioQuestion && (
              <div className="flex items-center">
                <input
                  type="radio"
                  onChange={handleRadio}
                  value={Answer.isRadio}
                  checked={Answer.isRadio}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label className="ml-2 text-sm font-medium text-[#414042] ">
                  {question.radioQuestion}
                </label>
              </div>
            )}

            <p className="py-3 text-center text-[#A1A1A1]">
              {[1, 2, 5, 9, 11, 12, 17, 20].includes(question.id)
                ? " tick one only"
                : " tick all that apply"}
            </p>
            <div>
              {question?.checkboxQuestion?.map((val, index) => (
                <div key={index} className="">
                  <div>
                    <div className="mb-4 flex items-center">
                      <input
                        type="checkbox"
                        value={
                          Answer.checkboxAnswer[index] ??
                          Answer.checkboxAnswer[index]
                        }
                        checked={
                          Answer.checkboxAnswer[index] ??
                          Answer.checkboxAnswer[index]
                        }
                        onChange={() => {
                          setAnswer({
                            ...Answer,
                            checkboxAnswer: {
                              ...Answer.checkboxAnswer,
                              [index]: !Answer.checkboxAnswer[index],
                            },
                            isRadio: false,
                          });
                        }}
                        name={index}
                        defaultValue
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                      />
                      <label className="ml-2 text-sm font-medium ">{val}</label>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                <h4 className="py-3 font-medium text-black ">Comments</h4>
                <textarea
                  className="placeholder:text-primary-green w-full rounded-md border border-gray-400 px-3 py-2"
                  placeholder="Write your comments here "
                  value={Answer.comment}
                  onChange={(e) => {
                    setAnswer({
                      ...Answer,
                      comment: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-10">
          {State > 0 && (
            <button
              className="rounded-sm bg-[#0566B1] px-5 py-2  text-white"
              onClick={() => {
                if (State > 1) {
                  setState(State - 1);
                } else {
                  setState(0);
                }
              }}
            >
              Back
            </button>
          )}
          {State === 19 && (
            <button
              className="rounded-sm bg-[#0566B1] px-5 py-2  text-white"
              onClick={() => {
                if (isAnswerChecked()) {
                  carePlanQuestions({
                    ["ques" + (State + 1)]: JSON.stringify(Answer),
                  });
                  navigate(-1);
                }
              }}
            >
              Save
            </button>
          )}
          {State + 1 < questionLength && (
            <button
              className="rounded-sm bg-[#0566B1] px-5 py-2  text-white"
              onClick={() => {
                if (State + 1 === 19) {
                  if (Answer.comment === "") {
                    alert("Please Add  comment ");
                  } else {
                    carePlanQuestions({
                      ["ques" + (State + 1)]: JSON.stringify(Answer),
                    });
                    setState(State + 1);
                  }
                } else if (isAnswerChecked()) {
                  carePlanQuestions({
                    ["ques" + (State + 1)]: JSON.stringify(Answer),
                  });
                  setState(State + 1);
                }
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}
export default Questions;
