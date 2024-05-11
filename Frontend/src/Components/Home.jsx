import React from 'react'
import Navbar from './Navbar'
import Card from './Card'

export default function Home() {
  return (
    <>
        <Navbar title={"My Notes"}/>
        <Card title={"First"} content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed doloribus mollitia laboriosam ratione ipsam fuga nobis corrupti ut. Obcaecati ad fugit, provident saepe quidem commodi tempora aperiam labore consequuntur. Facere consequatur autem, suscipit commodi sunt maxime deleniti blanditiis quam, accusamus, facilis cumque tenetur doloribus inventore ea molestias voluptates optio tempora explicabo aliquid minima eum vitae? Minus magni tenetur, doloremque, at debitis porro dolorem aliquid ipsam nobis laudantium nisi? Dolor earum soluta, praesentium quas id libero repudiandae dolore in fugit rem voluptate expedita nobis. Deserunt ratione nemo deleniti et error, accusantium, perferendis optio, labore harum reiciendis esse! Praesentium tempora aut libero!"}/>
        <Card title={"First"} content={"Content"}/>
        <Card title={"First"} content={"Content"}/>
        <Card title={"First"} content={"Content"}/>
    </>
  )
}
