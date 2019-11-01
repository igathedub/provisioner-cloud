
package skyy.blue.exportobjects;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.experimental.SuperBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "modelId",
    "subscribe",
    "bind",
    "publish"
})
@JsonPOJOBuilder(withPrefix="")
@SuperBuilder
public class Model {

    @JsonProperty("modelId")
    public String modelId;
    @JsonProperty("subscribe")
    public List<String> subscribe = null;
    @JsonProperty("bind")
    public List<Long> bind = null;
    @JsonProperty("publish")
    public Publish publish;

}
