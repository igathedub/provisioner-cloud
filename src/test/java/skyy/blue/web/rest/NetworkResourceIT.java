package skyy.blue.web.rest;

import skyy.blue.ProvisionerCloudApp;
import skyy.blue.domain.Network;
import skyy.blue.repository.NetworkRepository;
import skyy.blue.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static skyy.blue.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link NetworkResource} REST controller.
 */
@SpringBootTest(classes = ProvisionerCloudApp.class)
public class NetworkResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_GOBAL_TTL = 1;
    private static final Integer UPDATED_GOBAL_TTL = 2;

    private static final Integer DEFAULT_UNICAST = 1;
    private static final Integer UPDATED_UNICAST = 2;

    private static final String DEFAULT_NETWORK_KEY = "AAAAAAAAAA";
    private static final String UPDATED_NETWORK_KEY = "BBBBBBBBBB";

    private static final Integer DEFAULT_KEY_INDEX = 1;
    private static final Integer UPDATED_KEY_INDEX = 2;

    private static final Integer DEFAULT_FLAG_REFRESH_PHASE = 1;
    private static final Integer UPDATED_FLAG_REFRESH_PHASE = 2;

    private static final Integer DEFAULT_FLAG_IV_UPDATE = 1;
    private static final Integer UPDATED_FLAG_IV_UPDATE = 2;

    private static final Integer DEFAULT_IV_INDEX = 1;
    private static final Integer UPDATED_IV_INDEX = 2;

    private static final String DEFAULT_APP_KEY = "AAAAAAAAAA";
    private static final String UPDATED_APP_KEY = "BBBBBBBBBB";

    @Autowired
    private NetworkRepository networkRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restNetworkMockMvc;

    private Network network;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NetworkResource networkResource = new NetworkResource(networkRepository);
        this.restNetworkMockMvc = MockMvcBuilders.standaloneSetup(networkResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Network createEntity(EntityManager em) {
        Network network = new Network()
            .name(DEFAULT_NAME)
            .gobalTTL(DEFAULT_GOBAL_TTL)
            .unicast(DEFAULT_UNICAST)
            .networkKey(DEFAULT_NETWORK_KEY)
            .keyIndex(DEFAULT_KEY_INDEX)
            .flagRefreshPhase(DEFAULT_FLAG_REFRESH_PHASE)
            .flagIVUpdate(DEFAULT_FLAG_IV_UPDATE)
            .ivIndex(DEFAULT_IV_INDEX)
            .appKey(DEFAULT_APP_KEY);
        return network;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Network createUpdatedEntity(EntityManager em) {
        Network network = new Network()
            .name(UPDATED_NAME)
            .gobalTTL(UPDATED_GOBAL_TTL)
            .unicast(UPDATED_UNICAST)
            .networkKey(UPDATED_NETWORK_KEY)
            .keyIndex(UPDATED_KEY_INDEX)
            .flagRefreshPhase(UPDATED_FLAG_REFRESH_PHASE)
            .flagIVUpdate(UPDATED_FLAG_IV_UPDATE)
            .ivIndex(UPDATED_IV_INDEX)
            .appKey(UPDATED_APP_KEY);
        return network;
    }

    @BeforeEach
    public void initTest() {
        network = createEntity(em);
    }

    @Test
    @Transactional
    public void createNetwork() throws Exception {
        int databaseSizeBeforeCreate = networkRepository.findAll().size();

        // Create the Network
        restNetworkMockMvc.perform(post("/api/networks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(network)))
            .andExpect(status().isCreated());

        // Validate the Network in the database
        List<Network> networkList = networkRepository.findAll();
        assertThat(networkList).hasSize(databaseSizeBeforeCreate + 1);
        Network testNetwork = networkList.get(networkList.size() - 1);
        assertThat(testNetwork.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testNetwork.getGobalTTL()).isEqualTo(DEFAULT_GOBAL_TTL);
        assertThat(testNetwork.getUnicast()).isEqualTo(DEFAULT_UNICAST);
        assertThat(testNetwork.getNetworkKey()).isEqualTo(DEFAULT_NETWORK_KEY);
        assertThat(testNetwork.getKeyIndex()).isEqualTo(DEFAULT_KEY_INDEX);
        assertThat(testNetwork.getFlagRefreshPhase()).isEqualTo(DEFAULT_FLAG_REFRESH_PHASE);
        assertThat(testNetwork.getFlagIVUpdate()).isEqualTo(DEFAULT_FLAG_IV_UPDATE);
        assertThat(testNetwork.getIvIndex()).isEqualTo(DEFAULT_IV_INDEX);
        assertThat(testNetwork.getAppKey()).isEqualTo(DEFAULT_APP_KEY);
    }

    @Test
    @Transactional
    public void createNetworkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = networkRepository.findAll().size();

        // Create the Network with an existing ID
        network.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNetworkMockMvc.perform(post("/api/networks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(network)))
            .andExpect(status().isBadRequest());

        // Validate the Network in the database
        List<Network> networkList = networkRepository.findAll();
        assertThat(networkList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNetworks() throws Exception {
        // Initialize the database
        networkRepository.saveAndFlush(network);

        // Get all the networkList
        restNetworkMockMvc.perform(get("/api/networks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(network.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].gobalTTL").value(hasItem(DEFAULT_GOBAL_TTL)))
            .andExpect(jsonPath("$.[*].unicast").value(hasItem(DEFAULT_UNICAST)))
            .andExpect(jsonPath("$.[*].networkKey").value(hasItem(DEFAULT_NETWORK_KEY)))
            .andExpect(jsonPath("$.[*].keyIndex").value(hasItem(DEFAULT_KEY_INDEX)))
            .andExpect(jsonPath("$.[*].flagRefreshPhase").value(hasItem(DEFAULT_FLAG_REFRESH_PHASE)))
            .andExpect(jsonPath("$.[*].flagIVUpdate").value(hasItem(DEFAULT_FLAG_IV_UPDATE)))
            .andExpect(jsonPath("$.[*].ivIndex").value(hasItem(DEFAULT_IV_INDEX)))
            .andExpect(jsonPath("$.[*].appKey").value(hasItem(DEFAULT_APP_KEY)));
    }
    
    @Test
    @Transactional
    public void getNetwork() throws Exception {
        // Initialize the database
        networkRepository.saveAndFlush(network);

        // Get the network
        restNetworkMockMvc.perform(get("/api/networks/{id}", network.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(network.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.gobalTTL").value(DEFAULT_GOBAL_TTL))
            .andExpect(jsonPath("$.unicast").value(DEFAULT_UNICAST))
            .andExpect(jsonPath("$.networkKey").value(DEFAULT_NETWORK_KEY))
            .andExpect(jsonPath("$.keyIndex").value(DEFAULT_KEY_INDEX))
            .andExpect(jsonPath("$.flagRefreshPhase").value(DEFAULT_FLAG_REFRESH_PHASE))
            .andExpect(jsonPath("$.flagIVUpdate").value(DEFAULT_FLAG_IV_UPDATE))
            .andExpect(jsonPath("$.ivIndex").value(DEFAULT_IV_INDEX))
            .andExpect(jsonPath("$.appKey").value(DEFAULT_APP_KEY));
    }

    @Test
    @Transactional
    public void getNonExistingNetwork() throws Exception {
        // Get the network
        restNetworkMockMvc.perform(get("/api/networks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNetwork() throws Exception {
        // Initialize the database
        networkRepository.saveAndFlush(network);

        int databaseSizeBeforeUpdate = networkRepository.findAll().size();

        // Update the network
        Network updatedNetwork = networkRepository.findById(network.getId()).get();
        // Disconnect from session so that the updates on updatedNetwork are not directly saved in db
        em.detach(updatedNetwork);
        updatedNetwork
            .name(UPDATED_NAME)
            .gobalTTL(UPDATED_GOBAL_TTL)
            .unicast(UPDATED_UNICAST)
            .networkKey(UPDATED_NETWORK_KEY)
            .keyIndex(UPDATED_KEY_INDEX)
            .flagRefreshPhase(UPDATED_FLAG_REFRESH_PHASE)
            .flagIVUpdate(UPDATED_FLAG_IV_UPDATE)
            .ivIndex(UPDATED_IV_INDEX)
            .appKey(UPDATED_APP_KEY);

        restNetworkMockMvc.perform(put("/api/networks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNetwork)))
            .andExpect(status().isOk());

        // Validate the Network in the database
        List<Network> networkList = networkRepository.findAll();
        assertThat(networkList).hasSize(databaseSizeBeforeUpdate);
        Network testNetwork = networkList.get(networkList.size() - 1);
        assertThat(testNetwork.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testNetwork.getGobalTTL()).isEqualTo(UPDATED_GOBAL_TTL);
        assertThat(testNetwork.getUnicast()).isEqualTo(UPDATED_UNICAST);
        assertThat(testNetwork.getNetworkKey()).isEqualTo(UPDATED_NETWORK_KEY);
        assertThat(testNetwork.getKeyIndex()).isEqualTo(UPDATED_KEY_INDEX);
        assertThat(testNetwork.getFlagRefreshPhase()).isEqualTo(UPDATED_FLAG_REFRESH_PHASE);
        assertThat(testNetwork.getFlagIVUpdate()).isEqualTo(UPDATED_FLAG_IV_UPDATE);
        assertThat(testNetwork.getIvIndex()).isEqualTo(UPDATED_IV_INDEX);
        assertThat(testNetwork.getAppKey()).isEqualTo(UPDATED_APP_KEY);
    }

    @Test
    @Transactional
    public void updateNonExistingNetwork() throws Exception {
        int databaseSizeBeforeUpdate = networkRepository.findAll().size();

        // Create the Network

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNetworkMockMvc.perform(put("/api/networks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(network)))
            .andExpect(status().isBadRequest());

        // Validate the Network in the database
        List<Network> networkList = networkRepository.findAll();
        assertThat(networkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNetwork() throws Exception {
        // Initialize the database
        networkRepository.saveAndFlush(network);

        int databaseSizeBeforeDelete = networkRepository.findAll().size();

        // Delete the network
        restNetworkMockMvc.perform(delete("/api/networks/{id}", network.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Network> networkList = networkRepository.findAll();
        assertThat(networkList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Network.class);
        Network network1 = new Network();
        network1.setId(1L);
        Network network2 = new Network();
        network2.setId(network1.getId());
        assertThat(network1).isEqualTo(network2);
        network2.setId(2L);
        assertThat(network1).isNotEqualTo(network2);
        network1.setId(null);
        assertThat(network1).isNotEqualTo(network2);
    }
}
