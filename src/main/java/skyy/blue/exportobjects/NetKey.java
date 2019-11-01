
package skyy.blue.exportobjects;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.experimental.SuperBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "phase",
    "minSecurity",
    "key",
    "timestamp",
    "name",
    "index"
})
@JsonPOJOBuilder(withPrefix="")
@SuperBuilder
public class NetKey {

    @JsonProperty("phase")
    public Long phase;
    @JsonProperty("minSecurity")
    public String minSecurity;
    @JsonProperty("key")
    public String key;
    @JsonProperty("timestamp")
    public String timestamp;
    @JsonProperty("name")
    public String name;
    @JsonProperty("index")
    public Long index;

}
