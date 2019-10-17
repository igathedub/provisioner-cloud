package skyy.blue.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Node.
 */
@Entity
@Table(name = "node")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Node implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "provision_time")
    private ZonedDateTime provisionTime;

    @Column(name = "node_identifier")
    private String nodeIdentifier;

    @Column(name = "unicast_adress")
    private Integer unicastAdress;

    @Column(name = "features")
    private Integer features;

    @Column(name = "app_key")
    private String appKey;

    @ManyToOne
    @JsonIgnoreProperties("nodes")
    private MeshGroup meshGroup;

    @OneToMany(mappedBy = "node")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Element> elements = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Node name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ZonedDateTime getProvisionTime() {
        return provisionTime;
    }

    public Node provisionTime(ZonedDateTime provisionTime) {
        this.provisionTime = provisionTime;
        return this;
    }

    public void setProvisionTime(ZonedDateTime provisionTime) {
        this.provisionTime = provisionTime;
    }

    public String getNodeIdentifier() {
        return nodeIdentifier;
    }

    public Node nodeIdentifier(String nodeIdentifier) {
        this.nodeIdentifier = nodeIdentifier;
        return this;
    }

    public void setNodeIdentifier(String nodeIdentifier) {
        this.nodeIdentifier = nodeIdentifier;
    }

    public Integer getUnicastAdress() {
        return unicastAdress;
    }

    public Node unicastAdress(Integer unicastAdress) {
        this.unicastAdress = unicastAdress;
        return this;
    }

    public void setUnicastAdress(Integer unicastAdress) {
        this.unicastAdress = unicastAdress;
    }

    public Integer getFeatures() {
        return features;
    }

    public Node features(Integer features) {
        this.features = features;
        return this;
    }

    public void setFeatures(Integer features) {
        this.features = features;
    }

    public String getAppKey() {
        return appKey;
    }

    public Node appKey(String appKey) {
        this.appKey = appKey;
        return this;
    }

    public void setAppKey(String appKey) {
        this.appKey = appKey;
    }

    public MeshGroup getMeshGroup() {
        return meshGroup;
    }

    public Node meshGroup(MeshGroup meshGroup) {
        this.meshGroup = meshGroup;
        return this;
    }

    public void setMeshGroup(MeshGroup meshGroup) {
        this.meshGroup = meshGroup;
    }

    public Set<Element> getElements() {
        return elements;
    }

    public Node elements(Set<Element> elements) {
        this.elements = elements;
        return this;
    }

    public Node addElement(Element element) {
        this.elements.add(element);
        element.setNode(this);
        return this;
    }

    public Node removeElement(Element element) {
        this.elements.remove(element);
        element.setNode(null);
        return this;
    }

    public void setElements(Set<Element> elements) {
        this.elements = elements;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Node)) {
            return false;
        }
        return id != null && id.equals(((Node) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Node{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", provisionTime='" + getProvisionTime() + "'" +
            ", nodeIdentifier='" + getNodeIdentifier() + "'" +
            ", unicastAdress=" + getUnicastAdress() +
            ", features=" + getFeatures() +
            ", appKey='" + getAppKey() + "'" +
            "}";
    }
}
