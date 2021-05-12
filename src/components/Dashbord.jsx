import react from "react";
import db from "./../firebase";
import Header from "./Header";
import SidebarMenu from "./SidebarMenu";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Hits } from "react-instantsearch-dom";
const Dashbord = () => {
  react.useEffect(() => {}, []);
  const searchClient = algoliasearch(
    "PTV6AUJNKF",
    "34d4768411183e5052413e47b4a5fcbe"
  );
  return (
    <InstantSearch searchClient={searchClient} indexName={"products"}>
      <Header />
      {/* <SidebarMenu /> */}
      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Hits hitComponent={Hit} />
          </main>
        </div>
      </div>
    </InstantSearch>
  );
};

export default Dashbord;
const Hit = ({ hit }) => {
  return (
    <div className="card ">
      <div className="card-body">
        <div className={"row align-items-center"}>
          <div className={"col-sm-3"}>{hit.id}</div>
          <div className={"col-sm-3"}>{hit.country_code}</div>
          <div className={"col-sm-3"}>{hit.state_code}</div>
          <div className={"col-sm-3"}>{hit.name}</div>
        </div>
      </div>
    </div>
  );
};
