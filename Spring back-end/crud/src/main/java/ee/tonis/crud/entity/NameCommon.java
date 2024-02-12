package ee.tonis.crud.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class NameCommon {
    @JsonProperty("common")
    public String common;
}
