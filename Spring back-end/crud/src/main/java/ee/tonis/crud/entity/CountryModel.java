package ee.tonis.crud.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CountryModel {
    @JsonProperty("name")
    public NameCommon name;

    @JsonProperty("capital")
    public List<String> capital;

    @JsonProperty("population")
    public Long population;

    @JsonProperty("area")
    public double area;
}
