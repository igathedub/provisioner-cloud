
package skyy.blue.exportobjects;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "meshUUID",
    "provisioners",
    "nodes",
    "id",
    "groups",
    "netKeys",
    "$schema",
    "version",
    "timestamp",
    "meshName",
    "appKeys"
})
@Data
@JsonPOJOBuilder(withPrefix="")
@SuperBuilder
public class Configuration {

    @JsonProperty("meshUUID")
    public String meshUUID;
    @JsonProperty("provisioners")
    public List<Provisioner> provisioners = null;
    @JsonProperty("nodes")
    public List<Node> nodes = null;
    @JsonProperty("id")
    public String id;
    @JsonProperty("groups")
    public List<Group> groups = null;
    @JsonProperty("netKeys")
    public List<NetKey> netKeys = null;
    @JsonProperty("$schema")
    public String $schema;
    @JsonProperty("version")
    public String version;
    @JsonProperty("timestamp")
    public String timestamp;
    @JsonProperty("meshName")
    public String meshName;
    @JsonProperty("appKeys")
    public List<AppKey> appKeys = null;

}
