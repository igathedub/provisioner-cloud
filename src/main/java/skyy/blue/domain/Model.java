package skyy.blue.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Model.
 */
@Entity
@Table(name = "model")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Model implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "uuid")
    private Integer uuid;

    @ManyToOne
    @JsonIgnoreProperties("models")
    private Element element;

    @OneToMany(mappedBy = "model")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<State> states = new HashSet<>();

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

    public Model name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getUuid() {
        return uuid;
    }

    public Model uuid(Integer uuid) {
        this.uuid = uuid;
        return this;
    }

    public void setUuid(Integer uuid) {
        this.uuid = uuid;
    }

    public Element getElement() {
        return element;
    }

    public Model element(Element element) {
        this.element = element;
        return this;
    }

    public void setElement(Element element) {
        this.element = element;
    }

    public Set<State> getStates() {
        return states;
    }

    public Model states(Set<State> states) {
        this.states = states;
        return this;
    }

    public Model addState(State state) {
        this.states.add(state);
        state.setModel(this);
        return this;
    }

    public Model removeState(State state) {
        this.states.remove(state);
        state.setModel(null);
        return this;
    }

    public void setStates(Set<State> states) {
        this.states = states;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Model)) {
            return false;
        }
        return id != null && id.equals(((Model) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Model{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", uuid=" + getUuid() +
            "}";
    }
}
