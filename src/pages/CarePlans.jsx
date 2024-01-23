import { useState, useEffect, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiFillPrinter } from "react-icons/ai";
import useRestAPI from "../api";
import questions from "./Question/questions.json";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";
import { API_ROUTE, IMAGE_API_ROUTE } from "../api/constant";
import LoadingSVG from "../components/LoadingSvg";
import { getToken } from "../utility/utility";

function CarePlans() {
  const { getCarePlanQuestions, sendPrintMail } = useRestAPI();
  const { currentUser } = useContext(AuthContext);
  const [carePlans, setCarePlans] = useState({});
  const [care, getCare] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [TableData, setTableData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getCarePlanQuestions();
      const filter = Object.keys(data).filter((value) => data[value] !== null);
      setCarePlans(data);
      setTableData(filter);
      setLoading(true);
      axios
        .post(
          API_ROUTE + "/api/user/getCareReceiver",
          {
            id: currentUser?.id,
            name: "Deepak",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          },
        )
        .then((res) => {
          if (res.data.status) {
            getCare(res.data.data);
            setLoading(false);
          } else {
            console.log(res.data.error);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getData();
  }, []);

  const filteredCarePlans = Object.keys(carePlans)
    .filter((value) => carePlans[value] !== null)
    .map((value, index) => (
      <CarePlanCards
        key={index}
        CarePlans={carePlans}
        que={value}
        value={value}
      />
    ));
  if (isLoading) {
    return (
      <>
        <LoadingSVG />
      </>
    );
  }
  return (
    <div>
      <div
        className={`bg-[url(${"/images/rec-bg.png"})] relative flex h-[100px] justify-center border-b-2 border-[#1499FF] py-5`}
      >
        <div className="absolute top-[60%] flex items-center justify-center gap-4 ">
          <img
            className="h-20 w-20 rounded-full bg-white object-cover p-1"
            // src={`${process.env.PUBLIC_URL}/images/mother2.png`}
            src={IMAGE_API_ROUTE + "/" + care?.image}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://developers.google.com/static/maps/documentation/maps-static/images/error-image-generic.png";
            }}
            alt=""
          />

          <div>
            <h2 className="text-center text-2xl font-semibold">
              {care?.cr_name}
            </h2>
            <h5 className="mt-2 flex justify-center gap-5 font-semibold text-[#616161]">
              <span>{care?.cr_age} Years old </span>
              <span className="capitalize">{care?.cr_gender} </span>
            </h5>
          </div>
        </div>
      </div>
      <div className="bg-[#DFF0FC] px-6 py-10 text-left font-semibold ">
        <div className="md:mx-auto md:max-w-[700px]">
          <div className="flex items-center justify-between">
            <h3 className="py-4">Care Plan</h3>
            <div className="flex cursor-pointer gap-3">
              <Link to="/questions">
                <AiOutlineEdit />
              </Link>

              <AiFillPrinter
                onClick={() => {
                  sendPrintMail();
                }}
              />
            </div>
          </div>
          {Object.keys(carePlans).filter(
            (value) => carePlans[value] !== null,
          )[1] !== "status" ? (
            filteredCarePlans
          ) : (
            <>
              <div> Care Sheet doesn't exist</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const CarePlanCards = ({ value, CarePlans, que }) => {
  let data;

  try {
    data = JSON.parse(CarePlans[value]);
  } catch (error) {
    data = {};
  }

  const questionIndex = parseInt(que?.replace(/[^0-9]/g, ""), 10) - 1;

  // Check if the question index is within the valid range
  if (questionIndex >= 0 && questionIndex < 20) {
    const question = questions[questionIndex];
    const options = !data?.isRadio
      ? Object.keys(data.checkboxAnswer || {})
      : [];

    const getCheckboxQuestion = (option) => {
      const questionText = question?.checkboxQuestion;
      return questionText ? questionText[option] : "";
    };

    return (
      <div className="mt-4">
        <div className="flex flex-col items-center justify-center rounded-md bg-white">
          <h3 className="border-b px-4 py-3 text-center">{question?.title}</h3>
          <div className="grid w-full grid-cols-2 items-center gap-10 px-4 py-3">
            <div className="h-20 w-20 rounded-md border-2 border-[#0566B1]">
              <img
                src={question?.image}
                alt="sdfs"
                className="mx-auto h-full w-3/4"
              />
            </div>
            <ol className="list-disc">
              {data?.isRadio && (
                <li className="font-medium text-[#414042]">
                  {question?.radioQuestion}
                </li>
              )}
              {options.map((option, index) => (
                <li key={index} className="font-medium text-[#414042]">
                  {getCheckboxQuestion(option)}
                </li>
              ))}
            </ol>
          </div>
          {data?.comment && (
            <p className="text-center text-sm text-[#414042]">{data.comment}</p>
          )}
        </div>
        {question?.article === null ? (
          <div
            onClick={() => {
              alert(" Sheet doesn't exist");
            }}
            className="cursor-pointer rounded-b-md bg-[#0566B1] px-4 py-3 text-center text-white"
          >
            {question?.sheet}
          </div>
        ) : (
          <Link to={question?.article}>
            <div className="cursor-pointer rounded-b-md bg-[#0566B1] px-4 py-3 text-center text-white">
              {question?.sheet}
            </div>
          </Link>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default CarePlans;
