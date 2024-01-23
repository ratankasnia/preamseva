import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Testimonials from "../components/Testimonials/Testimonials";
import { isLogedInUser } from "../utility/utility";

function Home() {
  return (
    <div>
      {/* {Section======1} */}
      <div
        div
        className="bg-[#A7DAF7] py-5"
        style={{
          background:
            "linear-gradient(180deg, rgba(167, 218, 247, 0.3) 0%, rgba(5, 102, 177, 0.3) 100%)",
        }}
      >
        <div className="px-6 text-center text-base leading-relaxed md:mx-auto md:max-w-[1300px]">
          <p>
            This app has been inspired by our dear mother Dr. Prem Suri who
            passed away in November 2020 during the Covid pandemic.
          </p>
          <p className="my-5">
            She was a dedicated doctor who was passionate about the nursing
            aspects of patient care. The irony is that she herself developed a
            severe pressure sore at the end of her life.
          </p>
          <p>
            We hope that this app will support family and paid carers in looking
            after senior people in their homes.
          </p>
          <div className="flex justify-center ">
            <span className="cursor-pointer">
              <img src="/images/mother.png" alt="" />
            </span>
          </div>
        </div>
      </div>
      {/* {Section ====2} */}

      <div className="py-5 md:mx-auto md:max-w-[1300px]">
        <div className="flex justify-center py-5 ">
          {isLogedInUser() ? null : (
            <Link to="/auth/login">
              <button className="rounded-full bg-primary-dark px-6 py-2 font-semibold text-white ">
                Login/Register
              </button>
            </Link>
          )}
        </div>
        <h3 className="text-center text-xl font-medium text-primary-dark ">
          What is Prem Seva?
        </h3>
        <p className="mt-4  px-6  text-center leading-relaxed">
          Prem Seva is a information, educational and training resource to
          empower and support families and paid carers to provide compassionate
          and practical care for senior people at home. The content of the app
          has been carefully curated and drawn from reputable sources.
        </p>
        <div className="">
          <YoutubeVideo src={"https://www.youtube.com/embed/kf_Vm1-DheY"} />
        </div>
        <div className="flex justify-center py-5 ">
          <Modal title={"Prem Seva "}>
            <div>
              Dr Sanjay Suri:<br></br> Hello, it&#39;s great that you&#39;re
              watching this video about Prem Seva, an initiative to support
              senior care at home. My name is Doctor Sanjay Suri, and I am a
              Paediatrician working in the National Health Service in the UK.
              <br></br>
              <br></br>
              Dr Shubhada Suri: <br></br>And my name is Doctor Shubhada Suri,
              and I am a General practitioner. I have worked in healthcare for
              the elderly for many years. I am also the responsible doctor for a
              care home in the UK. <br></br>
              <br></br>
              Dr Sanjay Suri: <br></br>We set up Prem Seva in the memory of our
              dear mother, Doctor Prem Suri, who sadly passed away in November
              2020 in the middle of the Covid pandemic. She was a dedicated and
              caring doctor in India who inspired me to study medicine. I recall
              how during her ward rounds, she was meticulous about the nursing
              aspects of patient care. Unfortunately, she herself became ill and
              bed bound in the last few months of her life. One of the most
              distressing aspects of her illness was developing bed sores and
              this is one of the main reasons that prompted us to start this
              project. <br></br>
              <br></br>
              Dr Shubhada Suri:<br></br> So what is Prem Seva? Prem Seva is an
              online information, education and training resource. The aim of
              Prem Seva is to help and support families look after senior people
              in their own homes. As you will see in the care sheets and the
              care videos on this online resource, the emphasis is on practical
              care delivered in a compassionate manner. The content has been
              carefully put together by healthcare professionals. The care
              sheets are based on the common needs of senior people. The care
              videos show how to perform tasks commonly needed in looking after
              senior people. The content is classified into four main headings:
              healthcare, environment, equipment, and social needs.
              <br></br>
              <br></br>
              Dr Sanjay Suri:<br></br> India, like many countries, has a
              demographic of an ageing population. World class medical and
              technological healthcare is available in India. It is equally
              important that care at home, provided by families and carers, is
              well-informed and of high quality. Paid carers are often employed
              by agencies or bureaus and there is a need for skills training for
              these carers. Families often find themselves in a caring role and
              feel helpless. Prem Seva hopes to help you look after your senior
              relatives.<br></br>
              <br></br>Dr Shubhada Suri:<br></br> We hope you find this resource
              useful in providing care in a kind and compassionate manner.
              Caring can be a challenging and lonely task, and this can be made
              more difficult when you are unsure how to help or fear that you
              may not be doing things correctly. Once you use this resource,
              please take a few minutes to give us feedback about the content.
              We invite you to participate in the online discussion forum to
              build a community of people in similar caring roles. Thank you.
            </div>
          </Modal>
        </div>
      </div>

      {/* {Section ====3} */}

      <div
        className="bg-[#A7DAF7] py-5"
        style={{
          background:
            "linear-gradient(180deg, rgba(167, 218, 247, 0.3) 0%, rgba(5, 102, 177, 0.3) 100%)",
        }}
      >
        <div className="px-6 text-center text-sm leading-relaxed text-[#414042]">
          <div className="flex justify-center ">
            {" "}
            <span className="cursor-pointer">
              <img src="/images/mother2.png" alt="n" />
            </span>
          </div>
          <h3 className="my-3 text-2xl font-bold text-primary-dark">
            Contents of the app
          </h3>
          <p className="text-sm font-[400]">
            This app consists of care sheets and care<br></br> videos which are
            arranged under<br></br> four categories
          </p>{" "}
          <div className="flex justify-center ">
            <span className="cursor-pointer">
              <img src="/images/category.png" alt="n" />
            </span>
          </div>
        </div>
      </div>

      <div className=" py-5 md:mx-auto md:max-w-[1300px]">
        <div className="text-center text-sm leading-relaxed  text-[#414042]">
          <h3 className="my-3 text-2xl font-bold text-primary-dark">
            Care Plan approach
          </h3>
          <p className="text-sm font-[400]">
            When starting to use the app, the first <br></br> step is to create
            a care plan
          </p>{" "}
          <p className="mt-5 text-sm font-[400]">
            The video below will help you create<br></br> a care plan for the
            senior person.
          </p>
          <div className="mt-10">
            <YoutubeVideo src={"https://www.youtube.com/embed/mZb4LK5v26c"} />
          </div>
        </div>
        <div className="flex justify-center py-5 ">
          <Modal title={"Care Plan"}>
            <div>
              Hello, my name is Dr Shubhada Suri and I&#39;m going to talk to
              you about creating a care plan for senior person using this app.
              By the end of this video, you will understand what a care plan is,
              who should create a care plan, why a care plan is needed and how
              to create and use it. <br></br>
              <br></br>
              So, what is a care plan? A care plan is a useful way of describing
              the care needs of the senior person, their wishes and the
              resources needed to complete the care needs. And who should create
              the care plan? The care plan should be created by the primary
              caregiver in discussion with the senior person, if they are able
              to take part in the discussion. They should do this in a kind and
              compassionate manner, using language that the senior person can
              understand. This process should not be rushed, so please make sure
              there&#39;s enough time for discussion. The care plan is likely to
              change over a period of time and should be reviewed regularly.
              This will help navigate the changing care needs of the senior
              person. The frequency of review will depend on the care needs of
              the senior person.<br></br>
              <br></br>
              So, why have a care plan? A care plan helps everyone understand
              the senior persons needs and wishes and how they can be met. It
              ensures continuity of care so that if the carer or the family
              member looking after the senior person changes, they can simply
              look at the care plan and understand their care needs. This can be
              helpful at handover from one shift to another. A care plan can
              help the senior person live as independently as possible and have
              more control over their life.<br></br>
              <br></br>
              And how should you create a care plan? You will first need to have
              registered on this app. On the home screen, tap on the “Create a
              care plan” button. You need to record the details of the senior
              person, their name and age and the name and relationship of the
              person who is creating the care plan with them. There&#39;s a box
              to ask where the senior person would like to be called. The date
              of the care plan and the date for review should also be noted
              down. A series of questions will appear on the screen. You need to
              fill out these to create the final care plan, which will appear on
              the screen at the end after all the questions have been answered.
              There are twenty questions and it will not take long to answer
              them. Each care need is posed as a question. There are multiple
              options that can be ticked. The boxes that best fit the correct
              response simply need to be ticked. All questions will need to be
              answered. You may choose “none” if there is no care need implied
              in that question. If any other option is selected apart from
              “none”, then you may use the comments box to give more information
              as to how that care need could be met. For example, the first
              question is about the senior person’s level of understanding. And
              the answer could be that they get easily confused. In that case,
              the support needed will be to explain instructions slowly and
              clearly in simple language and repeat it as necessary in a patient
              manner, which will be entered in the comments box. Another example
              is if their mobility care need suggests that they use a walking
              stick, then the comments box should say that they should have the
              stick available and ready to use in case of need. The final care
              plan will provide a link to the mobility care sheet and care video
              as appropriate. A completed care plan is available on this app as
              an example. I hope you found this video useful in creating a care
              plan and we would love to hear your feedback. Thank you.
            </div>
          </Modal>
        </div>
      </div>

      <div className="">
        <h3 className="my-3 text-center text-2xl font-bold text-primary-dark">
          Testimonials
        </h3>
        <div className="flex items-center justify-center px-5">
          <Testimonials />
        </div>
      </div>

      <div>
        <div className="flex justify-center py-5">
          <div className="flex gap-5">
            <a
              href="https://testflight.apple.com/join/HDZYhVCP"
              download
              className="w-[140px]"
            >
              <img
                src="https://texttofloss.com/wp-content/uploads/2021/01/App-Store-Button-transparent.png"
                alt="dasd"
                className="w-[140px]"
              />
            </a>
            <a href={"/app.apk"} download className="w-[140px]">
              <img
                src="https://www.pngmart.com/files/10/Get-It-On-Google-Play-PNG-Transparent-Image.png"
                alt="dasd"
                className="h-full w-[140px]"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const YoutubeVideo = ({ src }) => {
  return (
    <div>
      <div className="mx-6  py-5">
        {/* <div className="w-full"> */}
        <iframe
          width="100%"
          className="h-[17em] md:h-[500px]"
          // height="179em"
          src={src}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Home;
