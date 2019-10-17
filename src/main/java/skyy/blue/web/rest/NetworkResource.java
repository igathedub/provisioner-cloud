package skyy.blue.web.rest;

import skyy.blue.domain.Network;
import skyy.blue.repository.NetworkRepository;
import skyy.blue.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link skyy.blue.domain.Network}.
 */
@RestController
@RequestMapping("/api")
public class NetworkResource {

    private final Logger log = LoggerFactory.getLogger(NetworkResource.class);

    private static final String ENTITY_NAME = "network";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NetworkRepository networkRepository;

    public NetworkResource(NetworkRepository networkRepository) {
        this.networkRepository = networkRepository;
    }

    /**
     * {@code POST  /networks} : Create a new network.
     *
     * @param network the network to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new network, or with status {@code 400 (Bad Request)} if the network has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/networks")
    public ResponseEntity<Network> createNetwork(@RequestBody Network network) throws URISyntaxException {
        log.debug("REST request to save Network : {}", network);
        if (network.getId() != null) {
            throw new BadRequestAlertException("A new network cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Network result = networkRepository.save(network);
        return ResponseEntity.created(new URI("/api/networks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /networks} : Updates an existing network.
     *
     * @param network the network to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated network,
     * or with status {@code 400 (Bad Request)} if the network is not valid,
     * or with status {@code 500 (Internal Server Error)} if the network couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/networks")
    public ResponseEntity<Network> updateNetwork(@RequestBody Network network) throws URISyntaxException {
        log.debug("REST request to update Network : {}", network);
        if (network.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Network result = networkRepository.save(network);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, network.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /networks} : get all the networks.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of networks in body.
     */
    @GetMapping("/networks")
    public ResponseEntity<List<Network>> getAllNetworks(Pageable pageable) {
        log.debug("REST request to get a page of Networks");
        Page<Network> page = networkRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /networks/:id} : get the "id" network.
     *
     * @param id the id of the network to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the network, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/networks/{id}")
    public ResponseEntity<Network> getNetwork(@PathVariable Long id) {
        log.debug("REST request to get Network : {}", id);
        Optional<Network> network = networkRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(network);
    }

    /**
     * {@code DELETE  /networks/:id} : delete the "id" network.
     *
     * @param id the id of the network to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/networks/{id}")
    public ResponseEntity<Void> deleteNetwork(@PathVariable Long id) {
        log.debug("REST request to delete Network : {}", id);
        networkRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
