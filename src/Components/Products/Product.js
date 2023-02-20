import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { getData } from "../../Api/ApiData";

const Product = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const fetchdata = async () => {
    try {
      const response = await getData();
      setProducts(response.data.products);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const columns = [
    {
      name: "Thumbnail",
      selector: (row) => row.thumbnail,
      cell: ({ thumbnail }) => (
        <img src={thumbnail} alt={"thumbnail"} style={{ maxWidth: "100px" }} />
      ),
    },
    {
      name: "Title",
      dataIndex: "title",
      selector: (row) => row.title,
      align: "center",
    },
    {
      name: "Category",
      dataIndex: "category",
      selector: (row) => row.category,
      align: "center",
    },
    {
      name: "Brand",
      dataIndex: "brand",
      selector: (row) => row.brand,
      align: "center",
    },
    {
      name: "Rating",
      dataIndex: "rating",
      selector: (row) => row.rating,
      align: "center",
    },
    {
      name: "Price",
      dataIndex: "price",
      selector: (row) => row.price,
      align: "center",
    },
    {
      name: "Discount",
      dataIndex: "discountPercentage",
      selector: (row) => row.discountPercentage,
      align: "center",
    },
  ];
  console.log("Products: ", products);
  return (
    <div className="products-item">
      <Navbar />
      <div className="container">
        <div className="row">
          <DataTable
            columns={columns}
            title={"Desserts"}
            data={products}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            onRowClicked={(state) => navigate(`/user/product/${state.id}`)}
            pagination
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
