import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProjectCard from './ProjectCard';

const CarouselRow = ({ title, projects }) => {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView="auto"
        navigation
        pagination={{ clickable: true }}
        className="!pb-12"
        breakpoints={{
          320: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
        }}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <ProjectCard project={project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselRow;

