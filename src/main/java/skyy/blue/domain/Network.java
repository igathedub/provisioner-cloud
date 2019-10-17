package skyy.blue.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Network.
 */
@Entity
@Table(name = "network")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Network implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "gobal_ttl")
    private Integer gobalTTL;

    @Column(name = "unicast")
    private Integer unicast;

    @Column(name = "network_key")
    private String networkKey;

    @Column(name = "key_index")
    private Integer keyIndex;

    @Column(name = "flag_refresh_phase")
    private Integer flagRefreshPhase;

    @Column(name = "flag_iv_update")
    private Integer flagIVUpdate;

    @Column(name = "iv_index")
    private Integer ivIndex;

    @Column(name = "app_key")
    private String appKey;

    @ManyToOne
    @JsonIgnoreProperties("networks")
    private Facility facility;

    @OneToMany(mappedBy = "network")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MeshGroup> groups = new HashSet<>();

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

    public Network name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getGobalTTL() {
        return gobalTTL;
    }

    public Network gobalTTL(Integer gobalTTL) {
        this.gobalTTL = gobalTTL;
        return this;
    }

    public void setGobalTTL(Integer gobalTTL) {
        this.gobalTTL = gobalTTL;
    }

    public Integer getUnicast() {
        return unicast;
    }

    public Network unicast(Integer unicast) {
        this.unicast = unicast;
        return this;
    }

    public void setUnicast(Integer unicast) {
        this.unicast = unicast;
    }

    public String getNetworkKey() {
        return networkKey;
    }

    public Network networkKey(String networkKey) {
        this.networkKey = networkKey;
        return this;
    }

    public void setNetworkKey(String networkKey) {
        this.networkKey = networkKey;
    }

    public Integer getKeyIndex() {
        return keyIndex;
    }

    public Network keyIndex(Integer keyIndex) {
        this.keyIndex = keyIndex;
        return this;
    }

    public void setKeyIndex(Integer keyIndex) {
        this.keyIndex = keyIndex;
    }

    public Integer getFlagRefreshPhase() {
        return flagRefreshPhase;
    }

    public Network flagRefreshPhase(Integer flagRefreshPhase) {
        this.flagRefreshPhase = flagRefreshPhase;
        return this;
    }

    public void setFlagRefreshPhase(Integer flagRefreshPhase) {
        this.flagRefreshPhase = flagRefreshPhase;
    }

    public Integer getFlagIVUpdate() {
        return flagIVUpdate;
    }

    public Network flagIVUpdate(Integer flagIVUpdate) {
        this.flagIVUpdate = flagIVUpdate;
        return this;
    }

    public void setFlagIVUpdate(Integer flagIVUpdate) {
        this.flagIVUpdate = flagIVUpdate;
    }

    public Integer getIvIndex() {
        return ivIndex;
    }

    public Network ivIndex(Integer ivIndex) {
        this.ivIndex = ivIndex;
        return this;
    }

    public void setIvIndex(Integer ivIndex) {
        this.ivIndex = ivIndex;
    }

    public String getAppKey() {
        return appKey;
    }

    public Network appKey(String appKey) {
        this.appKey = appKey;
        return this;
    }

    public void setAppKey(String appKey) {
        this.appKey = appKey;
    }

    public Facility getFacility() {
        return facility;
    }

    public Network facility(Facility facility) {
        this.facility = facility;
        return this;
    }

    public void setFacility(Facility facility) {
        this.facility = facility;
    }

    public Set<MeshGroup> getGroups() {
        return groups;
    }

    public Network groups(Set<MeshGroup> meshGroups) {
        this.groups = meshGroups;
        return this;
    }

    public Network addGroup(MeshGroup meshGroup) {
        this.groups.add(meshGroup);
        meshGroup.setNetwork(this);
        return this;
    }

    public Network removeGroup(MeshGroup meshGroup) {
        this.groups.remove(meshGroup);
        meshGroup.setNetwork(null);
        return this;
    }

    public void setGroups(Set<MeshGroup> meshGroups) {
        this.groups = meshGroups;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Network)) {
            return false;
        }
        return id != null && id.equals(((Network) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Network{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", gobalTTL=" + getGobalTTL() +
            ", unicast=" + getUnicast() +
            ", networkKey='" + getNetworkKey() + "'" +
            ", keyIndex=" + getKeyIndex() +
            ", flagRefreshPhase=" + getFlagRefreshPhase() +
            ", flagIVUpdate=" + getFlagIVUpdate() +
            ", ivIndex=" + getIvIndex() +
            ", appKey='" + getAppKey() + "'" +
            "}";
    }
}
