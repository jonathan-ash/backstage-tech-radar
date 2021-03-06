import { ApiRef } from '@backstage/core-plugin-api';
/**
 * {@link @backstage/core-plugin-api#ApiRef} for the {@link TechRadarApi}
 */
export declare const techRadarApiRef: ApiRef<TechRadarApi>;
/**
 * Tech Radar API responsible for loading data for the plugin
 *
 * @remarks
 *
 * This should be implemented by user, as {@link https://github.com/backstage/backstage/blob/master/plugins/tech-radar/src/sample.ts | default}
 * serves only some static data for example purposes
 */
export interface TechRadarApi {
    /**
     * Loads the TechRadar response data to pass through to the TechRadar component.
     * Takes the id prop of the TechRadarComponent or TechRadarPage to distinguish between multiple radars if needed
     */
    load: (id: string | undefined) => Promise<TechRadarLoaderResponse>;
}
/**
 * Tech Radar Ring which indicates stage of {@link RadarEntry}
 */
export interface RadarRing {
    /**
     * ID of the Ring
     */
    id: string;
    /**
     * Display name of the Ring
     */
    name: string;
    /**
     * Color used for entries in particular Ring
     *
     * @remarks
     *
     * Supports any value parseable by {@link https://www.npmjs.com/package/color-string | color-string}
     */
    color: string;
}
/**
 * Tech Radar Quadrant which represent area/topic of {@link RadarEntry}
 */
export interface RadarQuadrant {
    /**
     * ID of the Quadrant
     */
    id: string;
    /**
     * Display name of the Quadrant
     */
    name: string;
}
/**
 * Single Entry in Tech Radar
 */
export interface RadarEntry {
    /**
     * React key to use for this Entry
     */
    key: string;
    /**
     * ID of this Radar Entry
     */
    id: string;
    /**
     * ID of {@link RadarQuadrant} this Entry belongs to
     */
    quadrant: string;
    /**
     * Display name of the Entry
     */
    title: string;
    /**
     * User-clickable URL when rendered in Radar
     *
     * @remarks
     *
     * You can use `#` if you don't want to provide any other url
     */
    url: string;
    /**
     * History of the Entry moving through {@link RadarRing}
     */
    timeline: Array<RadarEntrySnapshot>;
    /**
     * Description of the Entry
     */
    description?: string;
}
/**
 * State of {@link RadarEntry} at given point in time
 */
export interface RadarEntrySnapshot {
    /**
     * Point in time when change happened
     */
    date: Date;
    /**
     * ID of {@link RadarRing}
     */
    ringId: string;
    /**
     * Description of change
     */
    description?: string;
    /**
     * Indicates trend compared to previous snapshot
     */
    moved?: MovedState;
}
/**
 * Indicates how {@link RadarEntry} moved though {@link RadarRing} on {@link RadarEntry.timeline}
 */
export declare enum MovedState {
    /**
     * Moved down
     */
    Down = -1,
    /**
     * Didn't move
     */
    NoChange = 0,
    /**
     * Move up
     */
    Up = 1
}
/**
 * Response from {@link TechRadarApi}
 */
export interface TechRadarLoaderResponse {
    /**
     * Quadrant of Tech Radar. Should be 4
     */
    quadrants: RadarQuadrant[];
    /**
     * Rings of Tech Radar
     */
    rings: RadarRing[];
    /**
     * Entries visualised in Tech Radar
     */
    entries: RadarEntry[];
}
