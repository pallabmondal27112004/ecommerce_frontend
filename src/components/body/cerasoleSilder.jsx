import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../bootstrap/ExampleCarousoleImage';
import image1 from '../../../public/imgs/new/banner2.png'
import image2 from '../../../public/imgs/new/banner1.jpeg'
import image3 from '../../../public/imgs/new/discountBanner.jpeg'
function IndividualIntervalsExample() {
  return (
    <Carousel className='w-100 container-fluid p-0 m-0 responsive-caresole' style={{height:'600px',objectFit: "cover", width:'100%'}}>
      <Carousel.Item interval={1000} style={{height:'600px'}} className='responsive-image-div'>
        <ExampleCarouselImage text="First slide" image={image1} className='w-100 h-100' />
        <Carousel.Caption >
       
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500} style={{height:'600px'}} className='responsive-image-div'>
        <ExampleCarouselImage text="Second slide" image={image2} />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{height:'600px'}} className='responsive-image-div'>
        <ExampleCarouselImage text="Third slide" image={image3} />
        <Carousel.Caption>
       
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default IndividualIntervalsExample;