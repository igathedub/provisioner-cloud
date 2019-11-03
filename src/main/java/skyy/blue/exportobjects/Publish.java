
package skyy.blue.exportobjects;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.experimental.SuperBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "index",
    "credentials",
    "ttl",
    "retransmit",
    "period",
    "address"
})
@JsonPOJOBuilder(withPrefix="")
@SuperBuilder
public class Publish {

    @JsonProperty("index")
    public int index;
    @JsonProperty("credentials")
    public int credentials;
    @JsonProperty("ttl")
    public int ttl;
    @JsonProperty("retransmit")
    public Retransmit retransmit;
    @JsonProperty("period")
    public int period;
    @JsonProperty("address")
    public String address;

}
