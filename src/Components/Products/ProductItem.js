
import React, { useEffect, useState } from "react";
import { Col, Row} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


import '../../style/style.scss'
import { getProductData } from "../../Api/ApiData";

const ProductItem = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
    
  const { id } = useParams();
  const fetchdata = async () => {
    try {
      const response = await getProductData(`${id}`);
      setProducts(response.data);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
    <Navbar/>   
    <div className="container ">
        <div className="project-Item-section d-flex flex-column align-items-center justify-content-center">
      <Row>
        <Col>
          <Card className="cardbody">
            <Card.Img variant="top" src={products.thumbnail} />
            <Card.Body>
              <Card.Title>Title : {products.title} </Card.Title>
              <Card.Text>Description: {products.description} </Card.Text>
              <Card.Text>Price: {products.price}</Card.Text>
              <Card.Text>Discount: {products.discountPercentage}</Card.Text>
              <Card.Text>Rating: {products.rating} </Card.Text>
              <Card.Text>Stock: {products.stock} </Card.Text>
              <Card.Text>Brand: {products.brand} </Card.Text>
              <Card.Text>Category: {products.category} </Card.Text>
              <Button onClick={() => navigate("/user/product")}>Back</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </div>
    </div>
    </>
    
  );
};

export default ProductItem;
