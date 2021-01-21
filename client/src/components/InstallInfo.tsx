import React from 'react';
import {ModalBase} from "./Modal/Common";
import {Loader, Dimmer, Button} from "semantic-ui-react";
import {AllElectron, IpcRenderer} from "electron";
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

const electron: AllElectron = (window as any).require('electron');
const ipcRenderer: IpcRenderer = electron.ipcRenderer;

interface InstallInfoProps {
    setIsInstalling: (installing: boolean) => void;
    reportError: (error: string, fatal?: boolean) => void;
}

interface InstallInfoState {
    stage: string;
    error: string | undefined;
    restoring: boolean | undefined;
    updateDismissed: boolean;
    jokeIndex: number;
}

export class InstallInfo extends React.Component<InstallInfoProps, InstallInfoState> {

    public constructor(props: InstallInfoProps){
        super(props);

        this.state = {
            stage: "DONE",
            error: undefined,
            restoring: false,
            updateDismissed: false,
            jokeIndex: 0
        };

        ipcRenderer.on("installstate", (event, args) => {
            if(!this.state.restoring) this.props.setIsInstalling([ "", "DONE" ].indexOf(args.state.stage || "") == -1); // go figure
            if(this.state.restoring && this.state.stage == "0%") this.props.setIsInstalling(true);
            this.setState(args.state);
        });

        ipcRenderer.send("install", null);

        setInterval(() => {
            if(this.state.stage == "DONE") return;
            this.setState({ jokeIndex: (this.state.jokeIndex+1) % this.Jokes.length });
        }, 15000);
    }

    private retry(){
        const wasRestoring = this.state.restoring;

        this.setState({ stage: "DONE", error: undefined, restoring: false });

        if(!wasRestoring && this.state.stage != "DISMISS"){
            ipcRenderer.send("install");
        }else{
            this.props.setIsInstalling(false);
        }
    }

    private dismiss(){
        ipcRenderer.send("startdaemon");
        ipcRenderer.send("daemoncheck");
        this.setState({ stage: "DISMISS", error: "Please note that some features such as compiling might not work. Restart CircuitBlocks to retry the update.", restoring: false, updateDismissed: true });
        this.props.setIsInstalling(false);
    }

    public render(){
        const { stage, error, restoring, updateDismissed, jokeIndex } = this.state;
        const loading = stage == "";

        if(stage == "DONE"){
            return null;
        }

        let subtitle: string | undefined = undefined;

        const stages: any = {
            ARDUINO: "Arduino",
            CLI: "Arduino CLI",
            RINGO: "Platform and board definitions", // formerly "Ringo board and libraries", hence the `RINGO` key
            UPDATE: "Checking for updates...",
            DISMISS: "Update"
        };

        let heading, status;

        if(error) {
            heading = "Error";
            status = error;
        }else if(restoring){
            heading = "Restoring Firmware";
            status = stage;
        }else{
            if(stage == "UPDATE"){
                heading = "Updating...";
                subtitle = "Hold on tight. This might take a bit.";
            }else if(stage == "DISMISS"){
                heading = "Update";
                // subtitle = ;
            }else{
                heading = "Installing...";
                subtitle = "Hold on tight. This might take up to 10 minutes.";
            }

            status = stages[stage];
        }

        return <div>
            <Dimmer active={true} />
            { loading
                ? <Loader active={true} size={"massive"} />
                : <ModalBase className={"small"}>
                    <div className={"title"} style={{ position: "relative", fontSize: 24, top: 0, textAlign: "center", marginBottom: 10, lineHeight: 1.2 }}>{ heading }</div>
                    <div className="content">
                        <Loader active={ error == undefined } indeterminate size={"massive"} inline={"centered"} style={{ margin: "20px auto" }} />
                        <div style={{ paddingTop: 0, textAlign: "center" }}>{ status }</div>
                        { subtitle && <div style={{ paddingTop: 5, textAlign: "center" }}>{ subtitle }</div> }
                        { (error == undefined && stage != "DISMISS") && <div style={{ paddingTop: 10 }}>
                            <Carousel value={jokeIndex} draggable={false}>
                                { this.Jokes.map(joke => <div style={{ textAlign: "center" }}>{ joke }</div>) }
                            </Carousel>
                        </div> }
                        { (error != undefined) && <Button onClick={ () => this.retry() } primary style={{ margin: "0 auto", display: "block", marginTop: 20 }}>{ restoring || stage == "DISMISS" ? "Ok" : "Try again" }</Button> }
                        { (error != undefined && !restoring && stage != "DISMISS") && <Button onClick={ () => this.dismiss() } role={"cancel"} color={"black"} style={{ margin: "0 auto", display: "block", marginTop: 20 }}>Continue without installing</Button> }
                    </div>
                </ModalBase> }
        </div>
    }

    private readonly Jokes: string[] = ((array: string[]) => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    })([
        "How did the programmer die in the shower? He read the shampoo bottle instructions. Lather, Rinse, Repeat!",
        "Never trust atoms. They make up everything!",
        "What did the pirate say on his 80th birthday? AYE MATEY!",
        "What's the best part about living in Switzerland? I don't know, but the flag is a big plus.",
        "Why couldn't the bike stand up by itself? It was two tired.",
        "How many tickles does it take to make an octopus laugh? Ten-tickles.",
        "Did you hear about the circus fire? It was in tents!",
        "What do you get when you cross a snowman with a vampire? Frostbite.",
        "Want to hear a joke about paper? Never mind. It's tearable.",
        "What did the drummer call his twin daughters? Anna one, Anna two!",
        "What sound does a witches car make? Broom Broom.",
        "What's the difference between a hippo and a zippo? One is really heavy, the other is a little lighter.",
        "Did you hear about the claustrophobic astronaut? He just needed a little space.",
        "Where are the average things manufactured? In a satisfactory.",
        "What sits at the bottom of the sea and twitches? A nervous wreck.",
        "Why can't you explain puns to kleptomaniacs? They always take things literally.",
        "A man tells his doctor, “Doc, help me. I'm addicted to social media!” The doctor replies, “Sorry, I don't follow you…”",
        "Why don't Calculus majors throw house parties. Because you should never drink and derive.",
        "What did the Tin Man say when he got run over by a steamroller? “Curses! Foil again!”",
        "What did the bald man exclaim when he received a comb for a present? Thanks— I'll never part with it!",
        "What rhymes with orange. No it doesn't.",
        "A ham and cheese sandwich walks into a bar and orders a beer. The bartender says “sorry, we don't serve food here.”",
        "Why can't you take electricity to social events? Because it doesn't know how to conduct itself.",
        "A neutron walks into a bar and asks, “How much for a whiskey?”. The bartender smiles and says, “For you, no charge.”",
        "What did the quantum physicist say before the bar fight? Let me atom!",
        "What did the left eye say to the right eye? Between you and me, something smells.",
        "What do you call a fake noodle? An impasta.",
        "What did the 0 say to the 8? Nice belt!",
        "What did one hat say to the other? You wait here. I'll go on a head.",
        "What do you call a magic dog? A labracadabrador.",
        "What did the shark say when he ate the clownfish? This tastes a little funny.",
        "What's orange and sounds like a carrot? A parrot.",
        "Why did the frog take the bus to work today? His car got toad away.",
        "What is an astronaut's favourite part on a computer? The space bar.",
        "Why did the yogurt go to the art exhibition? Because it was cultured.",
        "What do you call an apology written in dots and dashes? Re-Morse code.",
        "Did you hear about the two people who stole a calendar? They each got six months.",
        "Why is it annoying to eat next to basketball players. They dribble all the time.",
        "What breed of dog can jump higher than buildings? Any dog, because buildings can't jump.",
        "Why do bees have sticky hair? Because they use honeycombs.",
        "What did the police man say to his belly button? You're under a vest.",
        "\"We don't allow faster than light neutrinos in here\", said the bartender. A neutrino walks into a bar.",
        "Neutrino enters the bar. \"What will you drink?\" asks the bartender. \"Nothing,\" says neutrino \"I'm just passing through.\"",
        "How does the ocean says Hello? It waves.",
        "Why aren't koalas actual bears? They don't meet the koalafications.",
        "How do you throw a space party? You planet.",
        "The numbers 19 and 20 got into a fight. 21.",
        "Why did it get so hot in the baseball stadium after the game? All of the fans left.",
        "What do you call a train carrying bubblegum? A chew-chew train.",
        "Why did the math textbook visit the guidance counselor? It needed help figuring out its problems.",
        "Why are green beans the most Zen of all vegetables? Because they've found their inner peas.",
        "What do you call an alligator detective? An investi-gator.",
        "Why did the scarecrow win an award? Because he was outstanding in his field.",
        "There are two muffins baking in the oven. One muffin says to the other. “Phew, is it getting hot in here or is it just me?” The other muffin says, “Oh my god!! A TALKING MUFFIN!”",
        "What lights up a soccer stadium? A soccer match.",
        "Why shouldn't you write with a broken pencil? Because it's pointless.",
        "You know why you never see elephants hiding up in trees? Because they're really good at it.",
        "What is red and smells like blue paint? Red paint.",
        "Two gold fish are in a tank. One looks at the other and says. “Do You know how to drive this thing?!”",
        "What is the resemblance between a green apple and a red apple? They're both red except for the green one.",
        "Comic Sans, Helvetica, and Times New Roman walk into a bar. \"Get out!\" shouts the barman. \"We don't serve your font type here!\"",
        "Two dragons walk into a bar. The first one says, “It sure is hot in here.” His friend snaps back, “Shut your mouth!”",
        "The bartender says, “Hey, we have a drink named after you!” The screwdriver squeals, “You have a drink named Philip?”",
        "Knock Knock. Who's There? To. To Who? It's To Whom.",
        "A panda, a cowboy, a man with a cat on his shoulder, and an electrical engineer walk into a bar. “What is this.” the bartender yells. “some kind of joke?”",
        "Why did the dinosaur cross the road? Becouse chickens didnt exist yet!",
        "Did you hear that one joke about the statistician? Probably.",
        "Parallel lines have so much in common. It's too bad they'll never meet.",
        "Why don't crabs give to charity? Because they're shellfish.",
        "Can February March? No, but April May.",
        "What do you call a pig that does karate? A pork chop",
        "When do robots overheat? When they need to vent.",
        "How do rabbits travel? By hareplanes.",
        "How do you stop a bull from charging? Cancel its credit card.",
        "Why did the mushroom go to the party? Because he was a fungi.",
        "What do you call birds that stick together? Vel-crows.",
        "What do sea monsters eat? Fish and ships.",
        "Why can't your nose be 12 inches long? Because then it would be a foot.",
        "What did the ocean say to the shore? Nothing…It just waved.",
        "What did the tomato say to the other tomato during a race? Ketchup.",
        "How did the barber win the race? He knew a shortcut",
        "What do you call a sleeping dinosaur? A dino-snore.",
        "What do you call a pile of cats? A meow-tain.",
        "What's the difference between apathy and ignorance? I don't know. and I don't care!",
        "Eight out of every three people have trouble with fractions.",
        "Why did the scientist take out his doorbell? He wanted to win the no-bell prize.",
        "You matter! Except if you multiply yourself by speed of light twice, then you energy.",
        "Parents ask me why I don't clean my room. I tell them. \"In an isolated system entropy can only increase.\"",
        "Biology is the only science in which multiplication is the same thing as division.",
        "How did the astronaut serve dinner in outer space? On flying saucers.",
        "Two antennas got married. The wedding was lousy. but the reception was outstanding",
    ]);
}

export default InstallInfo;
