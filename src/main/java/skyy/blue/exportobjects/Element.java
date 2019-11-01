
package skyy.blue.exportobjects;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.experimental.SuperBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "index",
    "location",
    "models",
    "name"
})
@JsonPOJOBuilder(withPrefix="")
@SuperBuilder
public class Element {

    @JsonProperty("index")
    public int index;
    @JsonProperty("location")
    public String location;
    @JsonProperty("models")
    public List<Model> models = null;
    @JsonProperty("name")
    public String name;

}
