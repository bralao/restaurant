import React from 'react'

const Menu = () => {
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
