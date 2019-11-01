
package skyy.blue.exportobjects;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.experimental.SuperBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "allocatedGroupRange",
    "allocatedUnicastRange",
    "UUID",
    "provisionerName",
    "allocatedSceneRange"
})
@JsonPOJOBuilder(withPrefix="")
@SuperBuilder
public class Provisioner {

    @JsonProperty("allocatedGroupRange")
    public List<AllocatedRange> allocatedGroupRange = null;
    @JsonProperty("allocatedUnicastRange")
    public List<AllocatedRange> allocatedUnicastRange = null;
    @JsonProperty("UUID")
    public String uUID;
    @JsonProperty("provisionerName")
    public String provisionerName;
    @JsonProperty("allocatedSceneRange")
    public List<AllocatedRange> allocatedSceneRange = null;

}
