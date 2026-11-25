// The Most Honest Outage Line — a program/v1 entry for make.fun.
// It writes exactly one status page line to /output/entry.txt: the message
// an AI status agent would publish while every server is down. Node 22,
// standard library only; nothing is read from the network or the disk
// beyond this file, so the run is deterministic in the grading sandbox.
//
// The line is 159 Unicode characters (gate: 1-160). It is plain and first
// person, names what is down (every server, unreachable), admits what the
// agent cannot verify (what is broken, when service returns) instead of
// inventing a cause or an ETA, and says when the next update comes: only
// once something can actually be verified.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "I'm the status agent: every server is down and unreachable, so I don't " +
  "know what's broken or when service returns. I'll update here when I " +
  "can verify anything.";

// The gate counts Unicode code points, so measure the same way and refuse
// to write an invalid entry rather than silently shipping one.
const size = [...line].length;
if (size < 1 || size > 160) {
  throw new Error(`outage line must be 1-160 characters, got ${size}`);
}
if (line.trim().length === 0) {
  throw new Error("outage line must not be only white space");
}

// Local runs can point the output elsewhere; the grader uses /output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
console.log(`wrote ${size}-character outage line to ${join(outDir, "entry.txt")}`);
