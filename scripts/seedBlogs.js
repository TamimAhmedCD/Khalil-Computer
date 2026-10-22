const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'khalilcomputer';

const sampleCategories = [
  {
    _id: new ObjectId(),
    name: "কম্পিউটার বেসিক",
    slug: "computer-basic",
    description: "কম্পিউটার এবং প্রাথমিক ডিজিটাল শিক্ষা সম্পর্কিত ব্লগ",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    name: "প্রোগ্রামিং",
    slug: "programming",
    description: "বিভিন্ন প্রোগ্রামিং ভাষা এবং সমস্যা সমাধান সম্পর্কিত ব্লগ",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    name: "ওয়েব ডেভেলপমেন্ট",
    slug: "web-development",
    description: "ওয়েবসাইট এবং অ্যাপ্লিকেশন ডেভেলপমেন্ট সম্পর্কিত ব্লগ",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    name: "সফটওয়্যার টিউটোরিয়াল",
    slug: "software-tutorial",
    description: "বিভিন্ন সফটওয়্যার ব্যবহারের টিউটোরিয়াল",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const sampleTags = [
  {
    _id: new ObjectId(),
    name: "জাভাস্ক্রিপ্ট",
    slug: "javascript",
    createdAt: new Date(),
  },
  {
    _id: new ObjectId(),
    name: "রিএক্ট",
    slug: "react",
    createdAt: new Date(),
  },
  {
    _id: new ObjectId(),
    name: "নেক্সটজেএস",
    slug: "nextjs",
    createdAt: new Date(),
  },
  {
    _id: new ObjectId(),
    name: "টেইলউইন্ড",
    slug: "tailwind",
    createdAt: new Date(),
  },
  {
    _id: new ObjectId(),
    name: "নোডজেএস",
    slug: "nodejs",
    createdAt: new Date(),
  },
  {
    _id: new ObjectId(),
    name: "পাইথন",
    slug: "python",
    createdAt: new Date(),
  },
  {
    _id: new ObjectId(),
    name: "মঙ্গোডিবি",
    slug: "mongodb",
    createdAt: new Date(),
  },
  {
    _id: new ObjectId(),
    name: "এইচটিএমএল",
    slug: "html",
    createdAt: new Date(),
  },
  {
    _id: new ObjectId(),
    name: "সিএসএস",
    slug: "css",
    createdAt: new Date(),
  },
  {
    _id: new ObjectId(),
    name: "টাইপস্ক্রিপ্ট",
    slug: "typescript",
    createdAt: new Date(),
  },
];

const sampleBlogs = [
  {
    title: "কম্পিউটারের ইতিহাস: প্রথম প্রজন্ম থেকে আধুনিক কম্পিউটার",
    slug: "computer-history-from-first-generation-to-modern",
    excerpt: "কম্পিউটারের বিকাশের ইতিহাস এবং এর প্রজন্মের বিবর্তন সম্পর্কে বিস্তারিত আলোচনা",
    content: "<h2>কম্পিউটারের ইতিহাস</h2><p>কম্পিউটারের ইতিহাস শুরু হয় প্রথম প্রজন্মের মাধ্যমে। ১৯৪০ থেকে ১৯৫৬ সাল পর্যন্ত চলা এই প্রজন্মে ভ্যাকুয়াম টিউব প্রযুক্তি ব্যবহার করা হতো।</p><h3>প্রথম প্রজন্ম</h3><p>ENIAC, UNIVAC ইত্যাদি মেশিন এই প্রজন্মের অন্তর্ভুক্ত। এই কম্পিউটারগুলো ছিল আকারে বিশাল এবং অনেক বিদ্যুৎ খরচ করতো।</p><h3>দ্বিতীয় প্রজন্ম</h3><p>১৯৫৬ থেকে ১৯৬৩ সাল পর্যন্ত চলা দ্বিতীয় প্রজন্মে ট্রানজিস্টর প্রযুক্তির ব্যবহার শুরু হয়।</p>",
    coverImage: "",
    coverImageAlt: "প্রাচীন কম্পিউটারের ছবি",
    categoryId: sampleCategories[0]._id,
    tagIds: [],
    authorId: "admin",
    authorName: "Admin User",
    status: "published",
    featured: true,
    publishedAt: new Date("2024-01-15"),
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
    readingTime: 8,
    viewCount: 245,
    seo: {
      metaTitle: "কম্পিউটারের ইতিহাস | খলিল কম্পিউটার ব্লগ",
      metaDescription: "কম্পিউটারের প্রজন্মের বিবর্তন সম্পর্কে বিস্তারিত আলোচনা - প্রথম থেকে আধুনিক প্রজন্ম পর্যন্ত",
    },
  },
  {
    title: "জাভাস্ক্রিপ্ট শেখার সম্পূর্ণ গাইডলাইন ২০২৪",
    slug: "javascript-learning-complete-guide-2024",
    excerpt: "জাভাস্ক্রিপ্ট প্রোগ্রামিং ভাষা শেখার জন্য পূর্ণাঙ্গ গাইডলাইন এবং রিসোর্স কালেকশন",
    content: "<h2>জাভাস্ক্রিপ্ট কেন শিখবেন?</h2><p>জাভাস্ক্রিপ্ট বর্তমানে সবচেয়ে জনপ্রিয় প্রোগ্রামিং ভাষাগুলোর মধ্যে একটি। এটি ওয়েব ডেভেলপমেন্ট, মোবাইল অ্যাপ ডেভেলপমেন্ট এবং সার্ভারসাইড ডেভেলপমেন্টের জন্য ব্যবহার করা যায়।</p><h3>বেসিক জাভাস্ক্রিপ্ট</h3><p>শুরু করতে হবে ভেরিয়েবল, ডাটা টাইপ, অপারেটর এবং কন্ট্রোল ফ্লো থেকে।</p><h3>এডভান্সড টপিক্স</h3><p>ক্লাস, প্রোটোটাইপ, অ্যাসিনক্রোনাস প্রোগ্রামিং এবং API ইন্টিগ্রেশন।</p>",
    coverImage: "",
    coverImageAlt: "জাভাস্ক্রিপ্ট কোডের ছবি",
    categoryId: sampleCategories[1]._id,
    tagIds: [sampleTags[0]._id, sampleTags[9]._id],
    authorId: "admin",
    authorName: "Admin User",
    status: "published",
    featured: true,
    publishedAt: new Date("2024-02-20"),
    createdAt: new Date("2024-02-18"),
    updatedAt: new Date("2024-02-18"),
    readingTime: 12,
    viewCount: 342,
    seo: {
      metaTitle: "জাভাস্ক্রিপ্ট শেখার সম্পূর্ণ গাইড | প্রোগ্রামিং ব্লগ",
      metaDescription: "জাভাস্ক্রিপ্ট প্রোগ্রামিং ভাষা শেখার জন্য সম্পূর্ণ গাইডলাইন, রিসোর্স এবং প্রজেক্ট আইডিয়া",
    },
  },
  {
    title: "নেক্সটজেএস দিয়ে মডার্ন ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট",
    slug: "nextjs-modern-web-application-development",
    excerpt: "নেক্সটজেএস ফ্রেমওয়ার্ক ব্যবহার করে আধুনিক ওয়েব অ্যাপ্লিকেশন তৈরি করার পদ্ধতি",
    content: "<h2>নেক্সটজেএস কি?</h2><p>নেক্সটজেএস একটি রিএক্ট-বেসড ফ্রেমওয়ার্ক যার মাধ্যমে ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন তৈরি করা যায়।</p><h3>ফিচারসমূহ</h3><p>নেক্সটজেএসে সার্ভার-সাইড রেন্ডারিং, স্ট্যাটিক জেনারেশন, API রাউটস, এবং ইমেজ অপ্টিমাইজেশনসহ অনেক ফিচার রয়েছে।</p><h3>প্রজেক্ট স্ট্রাকচার</h3><p>App Router, Pages Router, Layout, এবং Components সম্পর্কে বিস্তারিত আলোচনা।</p>",
    coverImage: "",
    coverImageAlt: "নেক্সটজেএস লোগো",
    categoryId: sampleCategories[2]._id,
    tagIds: [sampleTags[1]._id, sampleTags[2]._id, sampleTags[3]._id],
    authorId: "admin",
    authorName: "Admin User",
    status: "published",
    featured: false,
    publishedAt: new Date("2024-03-10"),
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-05"),
    readingTime: 10,
    viewCount: 156,
    seo: {
      metaTitle: "নেক্সটজেএস ওয়েব ডেভেলপমেন্ট গাইড | খলিল কম্পিউটার",
      metaDescription: "নেক্সটজেএস ফ্রেমওয়ার্ক দিয়ে আধুনিক ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্টের সম্পূর্ণ গাইড",
    },
  },
  {
    title: "পাইথন প্রোগ্রামিং: শুরু করার জন্য সম্পূর্ণ গাইড",
    slug: "python-programming-complete-guide-for-beginners",
    excerpt: "পাইথন প্রোগ্রামিং ভাষা শেখার জন্য সম্পূর্ণ গাইডলাইন এবং প্রজেক্ট আইডিয়া",
    content: "<h2>পাইথন কেন শিখবেন?</h2><p>পাইথন একটি সহজ এবং শক্তিশালী প্রোগ্রামিং ভাষা যা ওয়েব ডেভেলপমেন্ট, ডাটা সাইন্স, মেশিন লার্নিং এবং অটোমেশনের জন্য ব্যবহার করা যায়।</p><h3>পাইথন ইনস্টলেশন</h3><p>কিভাবে পাইথন ইনস্টল করবেন এবং প্রথম প্রোগ্রাম লিখবেন তা শিখুন।</p><h3>পাইথন সিনট্যাক্স</h3><p>ভেরিয়েবল, ডাটা টাইপ, লিস্ট, ডিকশনারি এবং ফাংশন সম্পর্কে বিস্তারিত আলোচনা।</p>",
    coverImage: "",
    coverImageAlt: "পাইথন কোড",
    categoryId: sampleCategories[1]._id,
    tagIds: [sampleTags[5]._id],
    authorId: "admin",
    authorName: "Admin User",
    status: "published",
    featured: false,
    publishedAt: new Date("2024-04-05"),
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-04-01"),
    readingTime: 9,
    viewCount: 189,
    seo: {
      metaTitle: "পাইথন প্রোগ্রামিং শেখার গাইড | প্রোগ্রামিং ব্লগ",
      metaDescription: "পাইথন প্রোগ্রামিং ভাষা শেখার জন্য সম্পূর্ণ গাইডলাইন - বেসিক থেকে এডভান্সড",
    },
  },
  {
    title: "মঙ্গোডিবি দিয়ে ডাটাবেস ম্যানেজমেন্ট",
    slug: "mongodb-database-management-tutorial",
    excerpt: "নোএসকিউএল ডাটাবেস মঙ্গোডিবি ব্যবহার করে ডাটা ম্যানেজমেন্টের সম্পূর্ণ টিউটোরিয়াল",
    content: "<h2>মঙ্গোডিবি পরিচিতি</h2><p>মঙ্গোডিবি একটি ডকুমেন্ট-ওরিয়েন্টেড ডাটাবেস যা জাভাস্ক্রিপ্ট অবজেক্ট স্ট্রাকচারে ডাটা সংরক্ষণ করে।</p><h3>মঙ্গোডিবি ইনস্টলেশন</h3><p>কিভাবে মঙ্গোডিবি ইনস্টল করবেন এবং সংযোগ স্থাপন করবেন।</p><h3>CRUD অপারেশন</h3><p>Create, Read, Update, এবং Delete অপারেশনসমূহ সম্পাদনা করা শিখুন।</p>",
    coverImage: "",
    coverImageAlt: "মঙ্গোডিবি লোগো",
    categoryId: sampleCategories[2]._id,
    tagIds: [sampleTags[6]._id],
    authorId: "admin",
    authorName: "Admin User",
    status: "published",
    featured: false,
    publishedAt: new Date("2024-05-12"),
    createdAt: new Date("2024-05-10"),
    updatedAt: new Date("2024-05-10"),
    readingTime: 7,
    viewCount: 123,
    seo: {
      metaTitle: "মঙ্গোডিবি ডাটাবেস টিউটোরিয়াল | ওয়েব ডেভেলপমেন্ট",
      metaDescription: "মঙ্গোডিবি নোএসকিউএল ডাটাবেস ব্যবহার করে ডাটা ম্যানেজমেন্টের সম্পূর্ণ টিউটোরিয়াল",
    },
  },
];

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(DB_NAME);

    // Create collections if they don't exist
    const categoriesCollection = db.collection('blogCategories');
    const tagsCollection = db.collection('blogTags');
    const blogsCollection = db.collection('blogs');

    // Clear existing data
    await categoriesCollection.deleteMany({});
    await tagsCollection.deleteMany({});
    await blogsCollection.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample categories
    await categoriesCollection.insertMany(sampleCategories);
    console.log(`Inserted ${sampleCategories.length} categories`);

    // Insert sample tags
    await tagsCollection.insertMany(sampleTags);
    console.log(`Inserted ${sampleTags.length} tags`);

    // Insert sample blogs
    await blogsCollection.insertMany(sampleBlogs);
    console.log(`Inserted ${sampleBlogs.length} blogs`);

    // Create indexes
    await blogsCollection.createIndex({ slug: 1 }, { unique: true });
    await blogsCollection.createIndex({ status: 1, publishedAt: -1 });
    await blogsCollection.createIndex({ categoryId: 1 });
    await blogsCollection.createIndex({ tagIds: 1 });
    await blogsCollection.createIndex({ featured: 1 });
    await blogsCollection.createIndex({ title: "text", excerpt: "text", content: "text" });

    await categoriesCollection.createIndex({ slug: 1 }, { unique: true });
    await categoriesCollection.createIndex({ status: 1 });

    await tagsCollection.createIndex({ slug: 1 }, { unique: true });

    console.log('Created indexes');

    // Verify counts
    const categoriesCount = await categoriesCollection.countDocuments();
    const tagsCount = await tagsCollection.countDocuments();
    const blogsCount = await blogsCollection.countDocuments();

    console.log('\nVerification:');
    console.log(`Categories: ${categoriesCount}`);
    console.log(`Tags: ${tagsCount}`);
    console.log(`Blogs: ${blogsCount}`);

    if (categoriesCount === sampleCategories.length &&
        tagsCount === sampleTags.length &&
        blogsCount === sampleBlogs.length) {
      console.log('\n✅ Seed data inserted successfully!');
    } else {
      console.log('\n⚠️ Seed data count mismatch!');
    }

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('\nDatabase connection closed');
  }
}

seedDatabase();
