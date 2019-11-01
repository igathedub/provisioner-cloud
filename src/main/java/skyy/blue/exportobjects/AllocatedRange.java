
package skyy.blue.exportobjects;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.experimental.SuperBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "lowAddress",
    "highAddress"
})
@JsonPOJOBuilder(withPrefix="")
@SuperBuilder
public class AllocatedRange {

    @JsonProperty("lowAddress")
    public String lowAddress;
    @JsonProperty("highAddress")
    public String highAddress;

}
