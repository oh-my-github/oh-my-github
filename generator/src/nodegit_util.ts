/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/chalk/chalk.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/fs-extra/fs-extra.d.ts" />

let nodegit = require("nodegit");
import * as fse from "fs-extra";
import {
  red as chalkRed, blue as chalkBlue, green as chalkGreen,
  yellow as chalkYellow, magenta as chalkMagenta, bold as chalkBold
} from "chalk";

interface NodeGitCommit { }

interface NodeGitBranch {
  name(): string
}

interface NodeGitIndex {
  addAll(): Promise<void>
  write(): Promise<void>
  writeTree(): Promise<any>
}

interface NodeGitRepository {
  getCurrentBranch(): Promise<any>
  init(path: string, is_bare: number): Promise<NodeGitRepository>
  openIndex(): Promise<NodeGitIndex>
  createCommit(ref: string, author: any, committer: any, message: string, oid: any, unknown: any): Promise<any>
  getCommit(commit: any): Promise<any>
  checkoutBranch(repo: string, opt: Object): Promise<void>
  open(path: string): Promise<NodeGitRepository>
  getBranch(name: string): Promise<NodeGitBranch>
  getHeadCommit(): NodeGitCommit
  createBranch(name: string, commit: NodeGitCommit, option: number, signature: any, message: string): Promise<void>
  defaultSignature(): any
}

function nodegitLog(message: string) {
  console.log(`  ${chalkBlue("Running Git Command:")} ${message}`);
}

export async function addAllAndCommit(path: string,
                                      user: string,
                                      commitMessage: string,
                                      initial: boolean): Promise<void> {
  nodegitLog(`git commit -a -m "${commitMessage}"`);

  let repo: NodeGitRepository = await nodegit.Repository.open(path);
  let index = await repo.openIndex();
  await index.addAll();
  await index.write();
  let oid = await index.writeTree();

  var author = nodegit.Signature.now(user, user);
  var committer = nodegit.Signature.now(user, user);

  if (initial)
    return await repo.createCommit("HEAD", author, committer, commitMessage, oid, []);

  let head = await nodegit.Reference.nameToId(repo, "HEAD");
  let parent = await repo.getCommit(head);

  return await repo.createCommit("HEAD", author, committer, commitMessage, oid, [parent]);
}

export async function checkoutGhPagesBranch(path: string, user: string) {
  let repo: NodeGitRepository = undefined;

  /** initialize repository if not exist */
  try {
    repo = await nodegit.Repository.open(path);
  } catch (error) {
    nodegitLog("git init");
    repo = await nodegit.Repository.init(path, 0);
  }

  let branch: NodeGitBranch = undefined;

  /** do initial commit if not exist */
  try {
    branch = await repo.getCurrentBranch();
  } catch (error) {
    await addAllAndCommit(path, user, "initial commit", true);
    repo = await nodegit.Repository.open(path);
    branch = await repo.getCurrentBranch();
  }

  /** lookup gh-pages branch and create it if not exists */
  try {
    let ghPagesBranch = await repo.getBranch("gh-pages");
  } catch (error) {
    nodegitLog("git branch gh-pages HEAD");

    let headCommit = await repo.getHeadCommit();
    await repo.createBranch("gh-pages", headCommit, 0, repo.defaultSignature(), "message");
  }

  /** checkout gh-pages */
  let branchName = branch.name();
  if (!branchName.endsWith("/gh-pages")) {
    nodegitLog("git checkout gh-pages");

    repo = await nodegit.Repository.open(path);

    return await repo.checkoutBranch("gh-pages", {
      checkoutStrategy: nodegit.Checkout.STRATEGY.SAFE | nodegit.Checkout.STRATEGY.RECREATE_MISSING
    });
  }

  return await Promise.resolve();
}

/**
 * branchName: e.g 'gh-pages'
 * remoteName: e.g 'origin'
 * gitUrl: e.g 'git@github.com:1ambda/oh-my-github'
 */

export async function push(path: string, branchName: string, remoteName: string, gitUrl: string) {
  let repo: NodeGitRepository = await nodegit.Repository.open(path);
  let remote = undefined;

  try {
    remote = await nodegit.Remote.lookup(repo, remoteName);
  } catch (error) {
    nodegitLog(`git remote add ${remoteName} ${nodegit.rl}`);

    remote = await nodegit.Remote.create(repo, remoteName, gitUrl);
  }

  nodegitLog(`git push origin ${branchName}:${branchName} --force`);
  return await remote.push(
    [`+refs/heads/${branchName}:refs/heads/${branchName}`],
    { callbacks: {
      credentials: function(url, userName) {
        return nodegit.Cred.sshKeyFromAgent(userName);
      }
    }});
}

export async function publish(user: string, repoName: string) {
  let path = process.cwd();
  let branchName = "gh-pages";
  let remoteName = "origin";
  let gitUrl = `git@github.com:${user}/${repoName}`;
  let commitMessage = `Update profile (${(new Date).toISOString()})`;

  await checkoutGhPagesBranch(path, user);
  await addAllAndCommit(path, user, commitMessage, false);
  await push(path, branchName, remoteName, gitUrl);
}
