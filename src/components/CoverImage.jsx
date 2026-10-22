// Letterboxed cover: a blurred copy of the image fills the square, and the
// image itself sits contained on top so nothing is cropped.
const CoverImage = ({ src }) => (
  <>
    <span
      aria-hidden="true"
      className="absolute inset-[-25%] bg-cover bg-center blur-[26px] saturate-[1.35] brightness-[0.62]"
      style={{ backgroundImage: `url("${src}")` }}
    />
    <img
      src={src}
      alt=""
      loading="lazy"
      className="absolute left-0 top-1/2 h-auto w-full -translate-y-1/2"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  </>
);

export default CoverImage;
