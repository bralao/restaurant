import React, { useEffect, useState, useRef } from 'react'
import Cards from '../../components/Cards';
import { FaFilter } from 'react-icons/fa';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState("default"); // we are using useState to store the sort option. This way, we can sort the menu items based on the selected sort option.
  // ^here, we are using useState to store the menu items and the filtered items, and to store the selected category. This way, we can filter the menu items based on the selected category.

  //loading data
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const buttonsRef = useRef(null);

  useEffect(() => {
    //fetching data from backend
    //**fetching from frontend 1st
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:6001/menu");
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
    setCurrentPage(1); // resetting the current page to 1
  }

  //show all data
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory('all');
    setCurrentPage(1);
  }

  //sorting based on A-Z, Z-A, Low-High price
  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedItems = [...filteredItems];
    //logic
    switch(option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  }

  //pagination logic
  const indexOfLastItem = currentPage * itemsPerPage; // getting the index of the last item on the current page so we can slice the items array
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem); // getting the items for the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber); // function to change the current page
    buttonsRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to the buttons section
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
        {/* filtering and sorting */}
        <div ref={buttonsRef}>
          <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
            {/* category btns filter */}
            <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
              <button onClick={showAll} className={selectedCategory === "all" ? "active" : ""}>All</button>
              <button onClick={()=> filterItems("salad")} className={selectedCategory === "salad" ? "active" : ""}>Salad</button>
              <button onClick={()=> filterItems("pizza")} className={selectedCategory === "pizza" ? "active" : ""}>Pizza</button>
              <button onClick={()=> filterItems("soup")} className={selectedCategory === "soup" ? "active" : ""}>Soups</button>
              <button onClick={()=> filterItems("dessert")} className={selectedCategory === "dessert" ? "active" : ""}>Desserts</button>
              <button onClick={()=> filterItems("drinks")} className={selectedCategory === "drinks" ? "active" : ""}>Drinks</button>
            </div>
            {/* sorting filter*/}
            <div className="flex justify-end mb-4 rounded-sm">
              <div className="bg-black p-2">
                <FaFilter className="h-4 w-4 text-white"/>
              </div>
              {/* sorting options */}
              <select name="sort" id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-sm"
              >
                <option value="default">Default</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* products card */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 pt-4">
          {
            currentItems.map((item) => (
              <Cards key={item._id} item={item}/>
            ))
          }
        </div>
      </div>

      {/* pagination */}
      <div className="flex justify-center my-8">
        {
          Array.from({length: Math.ceil(filteredItems.length / itemsPerPage)}).map((_, index) => (
            <button
            key={index + 1}
            onClick={()=> paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"}`}>
              {index + 1}
            </button>
          ))
        }
      </div>
    </div>
  )
}

export default Menu
