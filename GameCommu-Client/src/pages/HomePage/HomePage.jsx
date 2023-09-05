import axios from "axios";
import { useEffect, useState } from "react";
import "./HomePage.css";

function HomePage() {
  const [data, setData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(3); // Number of initially visible items

  const showMoreItems = () => {
    // Increase the number of visible items when the button is clicked
    setVisibleItems(visibleItems + 3); // You can adjust the increment as needed
  };

  const DataGetter = async () => {
    try {
      const res = await axios.get("https://dog.ceo/api/breeds/image/random/100");
      console.log(res.data);
      setData(res.data);
    } catch {
      alert("error fetch");
    }
  };

  useEffect(() => {
    DataGetter();
  }, []);

  return (
    <div className="all-con">
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-ride="carousel"
        data-interval="2000"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-100 carousel-image"
              src="https://i.ytimg.com/vi/WjVO1CVqu4Y/sddefault.jpg"
              alt="First slide"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100 carousel-image"
              src="https://cdn.cloudflare.steamstatic.com/steam/apps/2280/capsule_616x353.jpg?t=1663861909"
              alt="Second slide"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100 carousel-image"
              src="https://i.ytimg.com/vi/UfP_3UD5qF8/maxresdefault.jpg"
              alt="Third slide"
            />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
      {data.message?.slice(0, visibleItems).map((item, id) => {
        return (
          <div key={id} style={{ background: "lightblue" }}>
            <div className="content-con">
              <div className="contentHead-con">
                <div className="contentProf-con">
                  <img src={item} />
                </div>
                <div className="contentTopic-con">
                  <a href="#">{id}</a>
                </div>
                <div className="contentOption-con">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        1
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        2
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        3
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="contentText-con">
                <img src="#" alt="Image" />
              </div>
              <div className="contentImg-con"></div>
            </div>
          </div>
        );
      })}
      <button onClick={showMoreItems} className="moreButt">Load More</button>
    </div>
  );
}

export default HomePage;
