export default async function handler(req, res) {
  const products = [
    {
        name: "Green Tea Crème Frappuccino",
        url: "/images/img1.png",
        thumbnail: {
          url: "/images/thumb1.png",
          id: 112,
          alt: "grapes-drink",
        },
        _id: "0579cn0u009ufo0asuyv05301",
        colorclass: "bg-green-900",
        price:3.65,
        product_id:"price_1KlFqvFXiOxU3BWLRWmrZ3RM"
      },
      {
        name: "Strawberry Açaí Refresher",
        url: "/images/img2.png",
        thumbnail: {
          url: "/images/thumb2.png",
          id: 645,
          alt: "jelly-drink",
        },
        _id: "agnosdafo5012u0joifhaslk1",
        colorclass: "bg-rose-300",
        price:3.75,
        product_id:"price_1KlFvpFXiOxU3BWL3BjPbM2M"
      },
      {
        name: "Strawberry Creme Frappuccino",
        url: "/images/img3.png",
        thumbnail: {
          url: "/images/thumb3.png",
          id: 341,
          alt: "strawberry-drink",
        },
        _id: "vnnxzcvnpqqwe050132nfdsadf",
        colorclass: "bg-pink-500",
        price: 2.95,
        product_id:"price_1KlFwDFXiOxU3BWLYzcfT5GA"
      },
]


  if (req.method !== "POST") {
    return res.status(422).json({ message: "req_method_not_supported" });
  }

  const { id: product_id } = req.query;

  if (!product_id) {
    return res.status(422).json({ message: "data_incomplete" });
  }

  try {
    const filteredProduct = products.filter((item) => item._id === product_id);
 
    return res.status(200).json({product:filteredProduct});
  } catch (err) {
    return res.status(500).json({ message: "Internal server error occured!" });
  }
}
