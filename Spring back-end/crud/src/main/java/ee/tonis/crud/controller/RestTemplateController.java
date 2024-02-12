package ee.tonis.crud.controller;

import ee.tonis.crud.entity.Country;
import ee.tonis.crud.entity.CountryModel;
import ee.tonis.crud.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class RestTemplateController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private CountryRepository countryRepository;

    @GetMapping("/restcountries")
    public List<Country> getCountriesFromAPI() {
        String url = "https://restcountries.com/v3.1/all";
        ResponseEntity<CountryModel[]> response = restTemplate.exchange(url, HttpMethod.GET, null, CountryModel[].class);
        CountryModel[] countries = response.getBody();

        if (countries == null || countries.length == 0) {
            throw new RuntimeException("No countries data retrieved from the API.");
        }

        List<Country> countriesList = new ArrayList<>();
        for (CountryModel country : countries) {
            Country newCountry = new Country();
            newCountry.setName(country.getName().getCommon());
            String capital = "";
            if (country.getCapital() != null && !country.getCapital().isEmpty()) {
                capital = country.getCapital().get(0);
            }
            newCountry.setCapital(capital);
            newCountry.setPopulation(country.getPopulation());
            newCountry.setArea((int) country.getArea());
            countriesList.add(newCountry);
        }
        countryRepository.saveAll(countriesList);
        return countriesList;
    }
}

