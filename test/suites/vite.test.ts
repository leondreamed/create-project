import fs from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, test } from "vitest";

import { ProjectType } from "~/types/project.js";
import { checkProject } from "~test/utils/check.js";
import { tempDir } from "~test/utils/path.js";
import {
  createProject,
  getProjectName,
  removeMyProject,
} from "~test/utils/project.js";

describe("creates valid Vite project", () => {
  const projectName = getProjectName(ProjectType.vite);
  const projectDestDir = path.join(tempDir, "my-vite-project");

  beforeAll(async () => {
    removeMyProject(projectDestDir);
    await createProject({
      projectDestDir,
      projectType: ProjectType.vite,
      projectName,
    });
  });

  checkProject({
    projectDir: projectDestDir,
  });

  test("should contain vite.config.ts", () => {
    expect(fs.existsSync(path.join(projectDestDir, "vite.config.ts"))).toBe(
      true
    );
  });
});
