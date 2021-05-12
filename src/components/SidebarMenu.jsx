import react from "react";
import db, { storage } from "./../firebase";
const SidebarMenu = () => {
  let [product, setProduct] = react.useState({});
  let [productImage, setProductImage] = react.useState({});
  const handelOnChange = (e) => {
    let { name, value } = e.target;
    if (name === "productImage") setProductImage(e.target.files[0]);
    else
      setProduct({
        ...product,
        [name]: value,
      });
    console.log(productImage);
  };
  const handelFormSubmit = (e) => {
    if (storage)
      storage
        .ref(`images/${productImage.name}`)
        .put(productImage)
        .on(
          "state_changed",
          (snapshot) => {},
          (err) => {
            console.log(err);
          },
          () => {
            storage
              .ref("images")
              .child(productImage.name)
              .getDownloadURL()
              .then((url) => {
                db.collection("products")
                  .add({ ...product, productImage: url })
                  .then(() => {
                    console.log("Document successfully written!");
                  })
                  .catch((error) => {
                    console.error("Error writing document: ", error);
                  });
              });
          }
        );
  };
  const getOptionForQty = () => {
    var i = 1;
    let opt = [];
    do {
      opt.push(<option value={i}>{i}</option>);
      i++;
    } while (i != 11);
    return opt;
  };
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <div className="card ">
              <div className="card-body">
                <form autoComplete="false">
                  <div className="form-row align-items-center">
                    <div className="form-group">
                      <div className="input-group input-group-sm mb-2 mr-sm-2">
                        <input
                          type="text"
                          className="form-control "
                          name="productName"
                          value={product.productName}
                          placeholder="Product Name "
                          onChange={handelOnChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Product Description</label>
                      <textarea
                        className="form-control input-group-sm"
                        name="productDescription"
                        value={product.productDescription}
                        onChange={handelOnChange}
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="form-group mt-2">
                      <select
                        className="form-select form-select-sm  mb-3"
                        aria-label=".form-select-lg example"
                        onChange={handelOnChange}
                        name={"productType"}
                        value={product.productType}
                      >
                        <option selected>Product Type</option>
                        <option value="1">Fashion</option>
                        <option value="2">Electronics</option>
                        <option value="3">grocery</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Product image</label>
                      <div className="input-group input-group-sm ">
                        <input
                          onChange={handelOnChange}
                          name={"productImage"}
                          value={product.productImage}
                          type="file"
                          className="form-control"
                          aria-describedby="inputGroup-sizing-sm"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group mb-3 mt-2">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          className="form-control"
                          onChange={handelOnChange}
                          name={"productPrice"}
                          placeholder="Price"
                          aria-label="Dollar amount (with dot and two decimal places)"
                        />
                        <span className="input-group-text">
                          <select
                            className="form-select form-select-sm"
                            value={product.productQty}
                            onChange={handelOnChange}
                            name={"productQty"}
                          >
                            {getOptionForQty()}
                          </select>
                        </span>
                      </div>
                    </div>
                    <div className="row justify-content-md-center">
                      <div className="col-md-4">
                        <button
                          type="button"
                          className="btn btn-success mt-1"
                          onClick={handelFormSubmit}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SidebarMenu;
