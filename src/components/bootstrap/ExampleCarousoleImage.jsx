const ExampleCarouselImage = ({ text='', image='' }) => {
  return (
    <div className="responsive-image-div" style={{ textAlign: "center"
    , background: "red", height:'600px' }}>
     <img src={image} alt="Profile Image" className="w-100 h-100"  style={{height:'100%'}}/>

      <p>{text}</p>


    </div>
  );
};

export default ExampleCarouselImage;
