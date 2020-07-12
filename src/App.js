import React from "react";
import "./styles.css";
import Header from "./components/header";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Loader from "./components/loader";
import Countries from "./components/countries";
import SelectBar from "./components/selectBar";
import SearchBar from "./components/searchBar";
import Themes from "./components/themes";
import CountryDetails from "./components/details";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      search: "",
      selectedRegion: "all",
      countries: [],
    };
    this.selectedRegion = this.selectedRegion.bind(this);
    this.searchCountry = this.searchCountry.bind(this);
  }
  async componentDidMount() {
    const url = "https://restcountries.eu/rest/v2/all";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ countries: data, loading: false });
  }

  async selectedRegion(e) {
    e.persist();
    let url = "";
    let selectedRegion = e.target.value;

    if (selectedRegion === "all") {
      url = "https://restcountries.eu/rest/v2/all";
    } else {
      url = `https://restcountries.eu/rest/v2/region/${selectedRegion}`;
    }
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      countries: data,
      selectedRegion: selectedRegion,
      filteredCountries: data,
      loading: false,
    });
  }

  async searchCountry(e) {
    const url = `https://restcountries.eu/rest/v2/all`;
    const { name, value } = e.target;
    const response = await fetch(url);
    const data = await response.json();
    let filtered = data.filter(
      (n) => n.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );

    this.setState({
      countries: filtered,
      [name]: value,
      loading: false,
    });
  }

  render() {
    const { countries, loading, search, selectedCountry } = this.state;
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <BrowserRouter>
              <Header />
              <Route exact path="/">
                <div className="form-elements">
                  <SearchBar
                    searchInput={search}
                    searchCountry={this.searchCountry}
                  />
                  <SelectBar
                    data={countries}
                    selectedValue={selectedCountry}
                    selectedRegion={this.selectedRegion}
                  />
                </div>
              </Route>

              <div className="main">
                <Switch>
                  <>
                    <Route
                      exact
                      path="/details/:id"
                      component={CountryDetails}
                    />
                    <div className="countries">
                      {countries.map((data) => {
                        return (
                          <Route
                            key={data.name}
                            exact
                            path="/"
                            component={() => (
                              <Countries key={data.name} data={data} />
                            )}
                          />
                        );
                      })}
                    </div>
                  </>
                </Switch>
              </div>
            </BrowserRouter>
          </>
        )}
      </>
    );
  }
}

export default App;
