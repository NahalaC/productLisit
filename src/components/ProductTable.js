
import React, { useState, useEffect } from "react";
import {
  Page,
  Card,
  DataTable,
  Modal,
  TextContainer,
  Thumbnail,
  Button,
} from "@shopify/polaris";

export default function ProductListing() {
  
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [modalOpen, setModalOpen] = useState(false); 
  const [activeFilter, setActiveFilter] = useState("All"); 
  const [searchQuery, setSearchQuery] = useState(""); 

  // State hooks 
  const [showPurchaseDropdown, setShowPurchaseDropdown] = useState(false); 
  const [showTypeDropdown, setShowTypeDropdown] = useState(false); 

  // state hooks
  const [purchaseAvailability, setPurchaseAvailability] = useState({
    onlineStore: false,
    pointOfSale: false,
    buyButton: false,
  });
  const [productType, setProductType] = useState({
    tShirt: false,
    accessory: false,
    giftCard: false,
  });

  // adding fake data
  const addFakeData = (products) => {
    const statuses = ["Active", "Draft", "Archived"];
    const inventoryOptions = ["Tracked", "Not Tracked"];
    const types = ["Outdoor", "Indoor"];
    const vendors = ["Company 123", "Company XYZ", "Company ABC"];
    return products.map((product, index) => ({
      ...product,
      status: statuses[index % statuses.length],
      inventory: inventoryOptions[index % inventoryOptions.length],
      type: types[index % types.length],
      vendor: vendors[index % vendors.length],
    }));
  };

  // fetching products from api
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        const productsWithData = addFakeData(data); //dummy data
        setProducts(productsWithData); 
        setFilteredProducts(productsWithData); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts(); 
  }, []);

  // filtering
  const handleFilterChange = (filter) => {
    setActiveFilter(filter); 
    filterProducts(searchQuery, filter); 
  };

  // searching 
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase(); 
    setSearchQuery(query); 
    filterProducts(query, activeFilter); 
  };

  
  const filterProducts = (query, filter) => {
    let filtered = products.filter((product) => {
      const isMatchingSearch =
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query); 

      const isMatchingFilter = filter === "All" || product.status === filter; 

      return isMatchingSearch && isMatchingFilter; 
    });
    setFilteredProducts(filtered); 
  };

  // modal open on clicking 
  const handleProductClick = (product) => {
    setSelectedProduct(product); 
    setModalOpen(true); 
  };

  // function to shorten the length of product name
  const truncateText = (text, maxLength = 5) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "..."; 
    }
    return text; 
  };

  // maping and filtering the product to table
  const productRows = filteredProducts.map((product) => [
    <div //modal opening on clicking
      style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      onClick={() => handleProductClick(product)} // 
    >
      <Thumbnail source={product.image} alt={product.title} size="small" />
      <span style={{ marginLeft: "10px" }}></span>
    </div>,
    <div
      style={{ cursor: "pointer" }}
      onClick={() => handleProductClick(product)} 
    >
      {truncateText(product.title)} {/*product name shortening*/}
    </div>,
    <div
      style={{
        backgroundColor: "#cce7ff",
        borderRadius: "12px",
        padding: "5px 10px",
        fontSize: "14px",
        textAlign: "center",
        display: "inline-block",
        cursor: "pointer",
      }}
      onClick={() => handleProductClick(product)} 
    >
      {product.status}
    </div>,
    <div
      style={{ cursor: "pointer" }}
      onClick={() => handleProductClick(product)} 
    >
      {product.inventory}
    </div>,
    <div
      style={{ cursor: "pointer" }}
      onClick={() => handleProductClick(product)} 
    >
      {product.type}
    </div>,
    <div
      style={{ cursor: "pointer" }}
      onClick={() => handleProductClick(product)} 
    >
      {product.vendor}
    </div>,
  ]);

  return (
    <Page
      title="Products" 
      primaryAction={{
        content: "Add Product", 
        onAction: () => console.log("Add product clicked"),
      }}
      secondaryActions={[ 
        {
          content: "Export",
          onAction: () => console.log("Export clicked"),
        },
        {
          content: "Import",
          onAction: () => console.log("Import clicked"),
        },
        {
          content: "More Options",
          onAction: () => console.log("More Options clicked"),
        },
      ]}
    >
      <Card>
        <div className="filters-container">
          <div>
            {["All", "Active", "Draft", "Archived"].map((filter) => (
              <label
                key={filter}
                onClick={() => handleFilterChange(filter)} //  filter managing
                className={`filter-label ${activeFilter === filter ? "active" : ""}`}
              >
                {filter}
                <span className={`filter-underline ${activeFilter === filter ? "active" : ""}`} />
              </label>
            ))}
          </div>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery} 
            onChange={handleSearchChange} 
            className="search-input"
          />

          <div className="dropdown-container">
            <button
              onClick={() => setShowPurchaseDropdown(!showPurchaseDropdown)} 
              className="dropdown-button"
            >
              Purchase Availability {'\u25BC'}
            </button>
          </div>

          <div className="dropdown-container">
            <button
              onClick={() => setShowTypeDropdown(!showTypeDropdown)} 
              className="dropdown-button"
            >
              Product Type {'\u25BC'}
            </button>
          </div>

          <button className="more-filters-button">
            More Filters
          </button>
        </div>

        {/* products in table */}
        <DataTable
          columnContentTypes={["text", "text", "text", "text", "text", "text"]}
          headings={[ 
            <span></span>,
            <span className="bold-heading">Product</span>,
            <span className="bold-heading">Status</span>,
            <span className="bold-heading">Inventory</span>,
            <span className="bold-heading">Type</span>,
            <span className="bold-heading">Vendor</span>
          ]}
          rows={productRows} 
        />
      </Card>

     
      <Modal
        open={modalOpen} // Modal open
        onClose={() => setModalOpen(false)} 
        title={selectedProduct?.title} 
      >
        <Modal.Section>
          <TextContainer>
            <div style={{ textAlign: "center" }}>
              <img
                src={selectedProduct?.image}
                alt={selectedProduct?.title}
                style={{ display: "block", margin: "auto", width: "30%" }}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <div style={{ borderBottom: "1px solid #dfe3e8", paddingBottom: "10px", marginBottom: "10px" }}>
                <p><strong>Description:</strong> {selectedProduct?.description}</p>
              </div>
              <div style={{ borderBottom: "1px solid #dfe3e8", paddingBottom: "10px", marginBottom: "10px" }}>
                <p><strong>Rating:</strong></p>
                <p>
                  <strong>Rate:</strong> {selectedProduct?.rating.rate}
                </p>
                <p>
                  <strong>Rated by:</strong> {selectedProduct?.rating.count} Customers
                </p>
              </div>
            </div>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </Page>
  );
}
