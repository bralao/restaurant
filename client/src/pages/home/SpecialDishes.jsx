import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from '../../components/Cards';

const SpecialDishes = () => {

  const [recipes, setRecipes] = useState([]);
  const slider = React.useRef(null);
  useEffect(() => { // fetch data from menu.json
    fetch("/menu.json")
      .then(res => res.json())
      .then(data => {
        const specials = data.filter((item) => item.category === "popular") // filter only the popular items
        // console.log(specials)
        setRecipes(specials) // set the state with the popular items
      })
  },[])

  //settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="section-container my-20">
      <div className="text-left">
        <p className="subtitle">Special Dishes</p>
        <h2 className="title md:w-[520px]">Standout Dishes From Our Menu</h2>
      </div>

      <Slider {...settings}>
        {
          recipes.map((item, i) => (
            <Cards key={i} item={item}/> // pass the item to the Cards component
          ))
        }
      </Slider>
    </div>
  )
}

export default SpecialDishes
