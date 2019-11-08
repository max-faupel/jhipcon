package com.jhipcon.web.rest;

import com.jhipcon.domain.Speaker;
import com.jhipcon.repository.SpeakerRepository;
import com.jhipcon.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.jhipcon.domain.Speaker}.
 */
@RestController
@RequestMapping("/api")
public class SpeakerResource {

    private final Logger log = LoggerFactory.getLogger(SpeakerResource.class);

    private static final String ENTITY_NAME = "conferenceSpeaker";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SpeakerRepository speakerRepository;

    public SpeakerResource(SpeakerRepository speakerRepository) {
        this.speakerRepository = speakerRepository;
    }

    /**
     * {@code POST  /speakers} : Create a new speaker.
     *
     * @param speaker the speaker to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new speaker, or with status {@code 400 (Bad Request)} if the speaker has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/speakers")
    public ResponseEntity<Speaker> createSpeaker(@Valid @RequestBody Speaker speaker) throws URISyntaxException {
        log.debug("REST request to save Speaker : {}", speaker);
        if (speaker.getId() != null) {
            throw new BadRequestAlertException("A new speaker cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Speaker result = speakerRepository.save(speaker);
        return ResponseEntity.created(new URI("/api/speakers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /speakers} : Updates an existing speaker.
     *
     * @param speaker the speaker to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated speaker,
     * or with status {@code 400 (Bad Request)} if the speaker is not valid,
     * or with status {@code 500 (Internal Server Error)} if the speaker couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/speakers")
    public ResponseEntity<Speaker> updateSpeaker(@Valid @RequestBody Speaker speaker) throws URISyntaxException {
        log.debug("REST request to update Speaker : {}", speaker);
        if (speaker.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Speaker result = speakerRepository.save(speaker);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, speaker.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /speakers} : get all the speakers.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of speakers in body.
     */
    @GetMapping("/speakers")
    public List<Speaker> getAllSpeakers(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Speakers");
        return speakerRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /speakers/:id} : get the "id" speaker.
     *
     * @param id the id of the speaker to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the speaker, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/speakers/{id}")
    public ResponseEntity<Speaker> getSpeaker(@PathVariable Long id) {
        log.debug("REST request to get Speaker : {}", id);
        Optional<Speaker> speaker = speakerRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(speaker);
    }

    /**
     * {@code DELETE  /speakers/:id} : delete the "id" speaker.
     *
     * @param id the id of the speaker to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/speakers/{id}")
    public ResponseEntity<Void> deleteSpeaker(@PathVariable Long id) {
        log.debug("REST request to delete Speaker : {}", id);
        speakerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
