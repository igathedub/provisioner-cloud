package skyy.blue.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A MeshGroup.
 */
@Entity
@Table(name = "mesh_group")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MeshGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "virtual")
    private Boolean virtual;

    @ManyToOne
    @JsonIgnoreProperties("meshGroups")
    private Network network;

    @OneToMany(mappedBy = "meshGroup")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Node> nodes = new HashSet<>();

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

    public MeshGroup name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isVirtual() {
        return virtual;
    }

    public MeshGroup virtual(Boolean virtual) {
        this.virtual = virtual;
        return this;
    }

    public void setVirtual(Boolean virtual) {
        this.virtual = virtual;
    }

    public Network getNetwork() {
        return network;
    }

    public MeshGroup network(Network network) {
        this.network = network;
        return this;
    }

    public void setNetwork(Network network) {
        this.network = network;
    }

    public Set<Node> getNodes() {
        return nodes;
    }

    public MeshGroup nodes(Set<Node> nodes) {
        this.nodes = nodes;
        return this;
    }

    public MeshGroup addNode(Node node) {
        this.nodes.add(node);
        node.setMeshGroup(this);
        return this;
    }

    public MeshGroup removeNode(Node node) {
        this.nodes.remove(node);
        node.setMeshGroup(null);
        return this;
    }

    public void setNodes(Set<Node> nodes) {
        this.nodes = nodes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MeshGroup)) {
            return false;
        }
        return id != null && id.equals(((MeshGroup) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MeshGroup{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", virtual='" + isVirtual() + "'" +
            "}";
    }
}
