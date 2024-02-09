package ee.tonis.crud.controller;

import ee.tonis.crud.entity.Country;
import ee.tonis.crud.repository.CountryRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@Log4j2
public class CountryController {

    @Autowired
    CountryRepository countryRepository;

    @GetMapping("all-countries")
    public List<Country> allCountries() {
        return countryRepository.findAll();
    }

    @PostMapping("add-country")
    public List<Country> addCountry(@RequestParam String name,
                                    @RequestParam String capital,
                                    @RequestParam Long population,
                                    @RequestParam int area) {
        Country country = new Country();
        country.setName(name);
        country.setCapital(capital);
        country.setPopulation(population);
        country.setArea(area);
        countryRepository.save(country);
        log.info("Country added name = " + name);
        return countryRepository.findAll();
    }

    @DeleteMapping("delete-country")
    public List<Country> deleteCountry(@RequestParam Long id) {
        countryRepository.deleteById(id);
        log.info("Country deleted id = " + id);
        return countryRepository.findAll();
    }

    @GetMapping("summarize-population")
    public long sumPopulation() {
        long sum = 0;
        List<Country> populations = countryRepository.findAll();
        for (Country value : populations) {
            sum = sum + value.getPopulation();
        }
        return sum;
    }

    @GetMapping("summarize-area")
    public double sumArea() {
        double sum = 0;
        List<Country> areas = countryRepository.findAll();
        for (Country value : areas) {
            sum = sum + value.getArea();
        }
        return sum;
    }

    @GetMapping("average-population")
    public long averagePopulation() {
        long sum = 0;
        List<Country> populations = countryRepository.findAll();
        for (Country value : populations) {
            sum = sum + value.getPopulation();
        }
        return sum / countryRepository.findAll().size();
    }

    @GetMapping("average-area")
    public double averageArea() {
        double sum = 0;
        List<Country> areas = countryRepository.findAll();
        for (Country value : areas) {
            sum = sum + value.getArea();
        }
        return sum / countryRepository.findAll().size();
    }

    @GetMapping("areas-between")
    public List<Country> areasBetween(@RequestParam int minArea,
                                      @RequestParam int maxArea) {
        List<Country> countriesBetween = new ArrayList<>();
        List<Country> areas = countryRepository.findAll();
        for (Country c : areas) {
            if (c.getArea() >= minArea && c.getArea() <= maxArea) {
                countriesBetween.add(c);
            }
        }
        return countriesBetween;
    }

    @GetMapping("populations-between")
    public List<Country> populationsBetween(@RequestParam int minPopulation,
                                      @RequestParam int maxPopulation) {
        List<Country> populationsBetween = new ArrayList<>();
        List<Country> populations = countryRepository.findAll();
        for (Country p : populations) {
            if (p.getPopulation() >= minPopulation && p.getPopulation() <= maxPopulation) {
                populationsBetween.add(p);
            }
        }
        return populationsBetween;
    }

    @PatchMapping("update-capital")
    public List<Country> updateCapital(@RequestParam Long id) {
        Country country = countryRepository.findById(id).get();
        country.setCapital("Tallinn");
        countryRepository.save(country);
        log.info("Country changed id = " + id);
        return countryRepository.findAll();
    }

    @PatchMapping("update-country")
    public ResponseEntity<Country> updateCountry(@RequestParam Long id, @RequestBody Country updatedCountry) {
        Optional<Country> optionalCountry = countryRepository.findById(id);
        if (optionalCountry.isPresent()) {
            Country existingCountry = optionalCountry.get();
            existingCountry.setName(updatedCountry.getName());
            existingCountry.setCapital(updatedCountry.getCapital());
            existingCountry.setPopulation(updatedCountry.getPopulation());
            existingCountry.setArea(updatedCountry.getArea());
            countryRepository.save(existingCountry);
            return ResponseEntity.ok(existingCountry);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
