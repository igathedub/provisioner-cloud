package skyy.blue.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import skyy.blue.exportobjects.*;

import java.util.Collections;
import java.util.List;

/**
 * REST controller for managing {@link Element}.
 */
@RestController
@RequestMapping("/api")
public class ConfigurationResource {

    private final Logger log = LoggerFactory.getLogger(ConfigurationResource.class);

    @GetMapping(value = "/configuration", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Configuration> getConfiguration() {
        log.debug("REST request to get Configuration");
        return ResponseEntity.ok().body(buildMockConfiguration());
    }


    private final List<Provisioner> provisioners = Collections.singletonList(Provisioner.builder()
        .allocatedGroupRange(createRange("C000","CC9A"))
        .allocatedUnicastRange(createRange("0001","199A"))
        .uUID("0AD9BA0E33204AE5B9D29EEAF12D7808")
        .provisionerName("Provisioner iPhone")
        .allocatedSceneRange(createRange("3333","0001")).build());



    private final List<Node> nodes = Collections.singletonList(Node.builder()
        .features(Features.builder().proxy(2).friend(2).relay(2).lowPower(2).build())
        .elements(null)
        .build());


    private Configuration buildMockConfiguration() {
        //TODO build from DB Objects
        return Configuration.builder()
            .meshUUID("1277B6E59E654DCE9C25220F2BA35A3B")
            .provisioners(provisioners)
            .nodes(nodes)
            .build();
    }

private static List<AllocatedRange> createRange(String low, String high) {
        return Collections.singletonList(AllocatedRange.builder().lowAddress(low).highAddress(high).build());
}

    private static Element createActiveElement() {
        return Element.builder().index(0).location("0001").build();
            //.models(Collections.un createModelWithSubscription()).build();
    }



}
