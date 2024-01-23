// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/free-mode";
// import "./Testimonials.css";

// import required modules
// import { FreeMode, Navigation } from "swiper/modules";
// import { useEffect, useState } from "react";
// import { API_ROUTE, IMAGE_API_ROUTE } from "../../api/constant";

// function Testimonials() {
//   const [testimonials, setTestimonials] = useState([]);

//   useEffect(() => {
//     const getTestimonials = async () => {
//       const result = await fetch(
//         API_ROUTE + "/api/testimonial/getTestimonials",
//       );
//       const data = await result.json();
//       setTestimonials(data.data);
//       console.log(data.data);
//     };
//     getTestimonials();
//   }, []);
//   return (
//     <div>
//       <Swiper
//         slidesPerView={3}
//         spaceBetween={30}
//         freeMode={true}
//         navigation={true}
//         pagination={{
//           clickable: true,
//         }}
//         breakpoints={{
//           600: {
//             slidesPerView: 1,
//             spaceBetween: 20,
//           },
//           644: {
//             slidesPerView: 1,
//             spaceBetween: 20,
//           },
//           768: {
//             slidesPerView: 2,
//             spaceBetween: 40,
//           },
//           1024: {
//             slidesPerView: 3,
//             spaceBetween: 50,
//           },
//         }}
//         modules={[FreeMode, Navigation]}
//         className="mySwiper"
//       >
//         {testimonials?.length > 0
//           ? testimonials.map((item) => (
//               <SwiperSlide key={item._id}>
//                 <div className="block items-start rounded bg-gray-100 px-10 md:flex md:pb-0">
//                   <div className="mt-5 rounded-full bg-white p-2">
//                     <img
//                       src={`${IMAGE_API_ROUTE}/${item.image}`}
//                       className="rounded md:rounded-full"
//                       alt=""
//                     />
//                   </div>
//                   <div className="px-5 py-5 text-left">
//                     <div className="text-justify">{item.comment}</div>
//                     <p>
//                       <strong className="text-sm">- {item.name}</strong>
//                     </p>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))
//           : null}
//       </Swiper>
//     </div>
//   );
// }

// export default Testimonials;

import React, { useEffect } from "react";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Testimonials.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { API_ROUTE, IMAGE_API_ROUTE } from "../../api/constant";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const getTestimonials = async () => {
      const result = await fetch(
        API_ROUTE + "/api/testimonial/getTestimonials",
      );
      const data = await result.json();
      setTestimonials(data.data);
    };
    getTestimonials();
  }, []);
  return (
    <>
      <Swiper
        spaceBetween={40}
        centeredSlides={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlide={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        breakpoints={{
          600: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          644: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 60,
          },
        }}
        navigation={true}
        rewind={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {testimonials?.length > 0
          ? testimonials.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="testimonial-slide block items-start rounded bg-gray-100 px-10 md:flex md:pb-0 ">
                  <div className="gap-2">
                    <div className="m-auto h-[100px] w-[100px] rounded-full bg-white p-2">
                      <img
                        src={`${IMAGE_API_ROUTE}/${item.image}`}
                        className="testimonial-image rounded-full md:rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="testimonial-content px-5 py-5 text-center">
                      <div className="">{item.comment}</div>
                      <p>
                        <strong className="text-sm">- {item.name}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </>
  );
}

export default Testimonials;
