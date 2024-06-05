import React, { useEffect, useState } from 'react'

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  // ^here, we are using useState to store the menu items and the filtered items. We are also using useState to store the selected category. This way, we can filter the menu items based on the selected category.
  const [sortOption, setSortOption] = useState("default");
  // ^here, we are using useState to store the sort option. This way, we can sort the menu items based on the selected sort option.

  //loading data
  useEffect(() => {
    //fetching data from backend
    //**fetching from frontend 1st
    const fetchData = async () => {
      try {
        const response = await fetch("/menu.json");
        const data = await response.json(); // converting the response to json
        /* console.log(data); */
        setMenu(data); // setting the menu state with the fetched data
        setFilteredItems(data); // setting the filteredItems state with the fetched data
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    //calling the function
    fetchData();
  }, [])

  // filtering data based on category
  const filterItems = (category) => {
    const filtered = category === "all"
      ? menu
      : menu.filter(item => item.category === category); // if the category is "all", we return all the menu items, otherwise we filter the menu items based on the selected category
    setFilteredItems(filtered); // setting the filteredItems state with the filtered data
    setSelectedCategory(category); // setting the selected category
  }

  //show all data
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory('all');
  }

  return (
    <div>
      {/* menu banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">

        <div className="py-48 flex flex-col items-center justify-center gap-8">
          {/*texts */}
          <div className="text-center space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious
              <span className="text-green"> Food</span>
            </h2>
            <p className="md:w-4/5 mx-auto text-xl text-[#4A4A4A]">Come with family & feel the joy of mouthwatering food such as Greek Salad, Lasagna, Butternut Pumpkin, Tokusen Wagyu, Olives Rellenas and more for a moderate cost</p>
            <button className="btn bg-green px-8 py-3 font-semibold text-white rounded-full">Order Now</button>
          </div>


        </div>
      </div>

      {/* menu shop */}
      <div className="section-container">

      </div>
    </div>
  )
}

export default Menu
