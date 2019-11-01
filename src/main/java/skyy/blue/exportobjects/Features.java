
package skyy.blue.exportobjects;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.experimental.SuperBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "proxy",
    "friend",
    "relay",
    "lowPower"
})
@JsonPOJOBuilder(withPrefix="")
@SuperBuilder
public class Features {

    @JsonProperty("proxy")
    public int proxy;
    @JsonProperty("friend")
    public int friend;
    @JsonProperty("relay")
    public int relay;
    @JsonProperty("lowPower")
    public int lowPower;

}
