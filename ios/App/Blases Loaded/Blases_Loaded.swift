//
//  Blases_Loaded.swift
//  Blases Loaded
//
//  Created by Benjamin Reed on 10/29/20.
//

import WidgetKit
import SwiftUI
import Intents

var blGreen = Color.init(red: 0, green: 0.658823529411765, blue: 0.192156862745098)
var customFont = Font.custom("ScoreBoard", size: 15).weight(.heavy)
var standingsFont = Font.system(size: 12)

var threeColumnGrid = [
    GridItem(.flexible(), spacing: nil, alignment: .topTrailing),
    GridItem(.flexible(), spacing: nil, alignment: .topTrailing),
    GridItem(.flexible(), spacing: nil, alignment: .topTrailing),
]

var smallStandingsGrid = [
    GridItem(.fixed(20), spacing: nil, alignment: .trailing),
    GridItem(.flexible(), spacing: nil, alignment: .leading),
    GridItem(.flexible(), spacing: nil, alignment: .trailing),
]

var largeStandingsGrid = [
    GridItem(.fixed(10), spacing: nil, alignment: .topTrailing),
    GridItem(.flexible(), spacing: nil, alignment: .topTrailing),
    GridItem(.fixed(20), spacing: nil, alignment: .topTrailing),
    GridItem(.fixed(10), spacing: nil, alignment: .topTrailing),
    GridItem(.flexible(), spacing: nil, alignment: .topTrailing),
    GridItem(.fixed(20), spacing: nil, alignment: .topTrailing),
]

struct Provider: IntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), configuration: ConfigurationIntent())
    }

    func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), configuration: configuration)
        completion(entry)
    }

    func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate, configuration: configuration)
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let configuration: ConfigurationIntent
}

struct PlainGroupBoxStyle: GroupBoxStyle {
    func makeBody(configuration: Configuration) -> some View {
        VStack(alignment: .center) {
            Spacer()
            configuration.label
            VStack(alignment: .center) {
                configuration.content
            }.frame(maxWidth: .infinity)
            .padding(.all)
            .background(Color.black)
            .foregroundColor(Color.white)
            .border(Color.white, width: 5)
            Spacer()
        }
    }
}

struct ScoreBoardText : View {
    var text: String

    @ViewBuilder
    var body : some View {
        Text(text).font(customFont)
    }
}

struct StatBoxItemView<Label, Content> : View where Label : View, Content : View {
    var label: Label
    var content: Content

    @ViewBuilder
    var body: some View {
        HStack {
            label
            ZStack {
                Rectangle().fill(Color.black).frame(width: 44, height: 30).border(Color.yellow, width: 2)
                content.frame(width:32, alignment: .trailing)
            }
        }
    }
}

struct SmallStatBoxView : View {
    var entry: Provider.Entry

    @ViewBuilder
    var body: some View {
        GroupBox(label: Text("Garages vs. Fridays").font(.caption)) {
            VStack(alignment:.trailing) {
                StatBoxItemView(label:ScoreBoardText(text:"INN"), content: HStack {
                    Text("▾")
                    Text("10").font(customFont)
                })
                StatBoxItemView(label:ScoreBoardText(text:"OUT"), content:ScoreBoardText(text:"1"))
                StatBoxItemView(label:ScoreBoardText(text:"AWAY"), content:ScoreBoardText(text:"0"))
                // StatBoxItemView(label:ScoreBoardText(text:"BALL"), content:ScoreBoardText(text:"0"))
                // StatBoxItemView(label:ScoreBoardText(text:"STR"), content:ScoreBoardText(text:"1"))
                // StatBoxItemView(label:ScoreBoardText(text:"HOME"), content:ScoreBoardText(text:"0"))
            }
        }.groupBoxStyle(PlainGroupBoxStyle())
    }
}

struct LargeStatBoxView : View {
    var entry: Provider.Entry

    @ViewBuilder
    var body: some View {
        GroupBox(label: Text("Garages vs. Fridays").font(.caption)) {
            LazyVGrid(columns: threeColumnGrid) {
                StatBoxItemView(label:ScoreBoardText(text:"INN"), content: HStack {
                    Text("▾")
                    Text("10").font(customFont)
                })
                StatBoxItemView(label:ScoreBoardText(text:"OUT"), content:ScoreBoardText(text:"1"))
                StatBoxItemView(label:ScoreBoardText(text:"AWAY"), content:ScoreBoardText(text:"0"))
                StatBoxItemView(label:ScoreBoardText(text:"BALL"), content:ScoreBoardText(text:"0"))
                StatBoxItemView(label:ScoreBoardText(text:"STR"), content:ScoreBoardText(text:"1"))
                StatBoxItemView(label:ScoreBoardText(text:"HOME"), content:ScoreBoardText(text:"0"))
            }
        }.groupBoxStyle(PlainGroupBoxStyle())
    }
}

struct TeamIcon : View {
    var text: String;
    var color: Color;

    @inlinable public init(_ content: String, _ color: Color) {
        self.text = content;
        self.color = color;
    }

    @ViewBuilder
    var body: some View {
        ZStack {
            Circle().strokeBorder(Color.black,lineWidth:1).background(Circle().fill(color).frame(width:22,height:22)).frame(width:22,height:22)
            Text(text).font(standingsFont)
        }
    }
}

struct StandingsText : View {
    let text: String;

    @inlinable public init(_ content: String) {
        self.text = content;
    }

    @ViewBuilder
    var body: some View {
        Text(text).font(standingsFont).foregroundColor(.white).bold()
    }
}

struct SmallStandingsView : View {
    var entry: Provider.Entry

    @ViewBuilder
    var body: some View {
        VStack {
            Text("Wild High").font(.title3).foregroundColor(.white).bold()
            LazyVGrid(columns: smallStandingsGrid) {
                TeamIcon("🐅", Color.init(red:0x5c/255, green:0x1c/255, blue:0x1c/255))
                StandingsText("HAT")
                StandingsText("62-42")

                TeamIcon("🔥", Color.init(red:0x8c/255, green:0x2a/255, blue:0x3e/255))
                StandingsText("CHIF")
                StandingsText("59-43")

                TeamIcon("👐", Color.init(red:0x63/255, green:0x88/255, blue:0xad/255))
                StandingsText("BJAZ")
                StandingsText("46-52")

                /*
                TeamIcon("🍗", Color.init(red:0xd1/255, green:0x57/255, blue:0.0))
                StandingsText("MCWW")
                StandingsText("33-61")

                TeamIcon("🏋️‍♀️", Color.init(red:0xe8/255, green:0x30/255, blue:0xab/255))
                StandingsText("MCWW")
                StandingsText("28-61")
                 */
            }
            .padding(.horizontal)
        }.padding(.top)
    }
}

struct Blases_LoadedEntryView : View {
    @Environment(\.widgetFamily) var family: WidgetFamily
    var entry: Provider.Entry

    @ViewBuilder
    var body: some View {
        VStack {
            switch family {
            case .systemSmall: SmallStandingsView(entry: entry)
            case .systemMedium: LargeStatBoxView(entry: entry)
            case .systemLarge: LargeStatBoxView(entry: entry)
            default: Text(entry.date, style: .time)
            }
            Spacer()
        }
    }
}

@main
struct Blases_Loaded: Widget {
    let kind: String = "Blases_Loaded"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
            Blases_LoadedEntryView(entry: entry)
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(blGreen)
        }
        .configurationDisplayName("Blases Loaded")
        .description("Participate in the cultural event of Blaseball.")
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
    }
}

struct Blases_Loaded_Previews: PreviewProvider {
    static var previews: some View {
        Blases_LoadedEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent()))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
