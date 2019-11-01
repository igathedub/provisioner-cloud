
package skyy.blue.exportobjects;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.experimental.SuperBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "features",
    "elements",
    "unicastAddress",
    "configComplete",
    "netKeys",
    "defaultTTL",
    "cid",
    "appKeys",
    "blacklisted",
    "UUID",
    "security",
    "crpl",
    "name",
    "deviceKey",
    "vid",
    "pid"
})
@JsonPOJOBuilder(withPrefix="")
@SuperBuilder
public class Node {

    @JsonProperty("features")
    public Features features;
    @JsonProperty("elements")
    public List<Element> elements = null;
    @JsonProperty("unicastAddress")
    public String unicastAddress;
    @JsonProperty("configComplete")
    public Boolean configComplete;
    @JsonProperty("netKeys")
    public List<NetKeyIndex> netKeyIndices = null;
    @JsonProperty("defaultTTL")
    public Long defaultTTL;
    @JsonProperty("cid")
    public String cid;
    @JsonProperty("appKeys")
    public List<AppKeyIndex> appKeyIndices = null;
    @JsonProperty("blacklisted")
    public Boolean blacklisted;
    @JsonProperty("UUID")
    public String uUID;
    @JsonProperty("security")
    public String security;
    @JsonProperty("crpl")
    public String crpl;
    @JsonProperty("name")
    public String name;
    @JsonProperty("deviceKey")
    public String deviceKey;
    @JsonProperty("vid")
    public String vid;
    @JsonProperty("pid")
    public String pid;

}
